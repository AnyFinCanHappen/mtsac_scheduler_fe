import {Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import React, {Component} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popover  from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import ColorList from "../constants/Colors.json";
import "../css/delete_button.css";
import "../css/Calendar.css";


const localizer = momentLocalizer(moment);
const {colorList} = ColorList;
class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopover : false,
            target : null,
            prevTarget:null,
            popoverData : null,
            showColorPopover : false
        };
    }

    handleEventClick = (eventObject, e) =>{
        const {showPopover,target} = this.state;
        const {resource} = eventObject;
        let popoverData = {
            title: eventObject.title,
            CRN: resource.CRN,
            location: resource.location,
            instructor: resource.instructor,
            cred:resource.cred,
        }
        let show;
        if(target !== e.target){
            show = true;
            let prevTarget = target;
            this.setState({
                target:e.target,
                prevTarget:prevTarget
            });
        }
        else{
            show = !showPopover;
        }
        this.setState({
            popoverData:popoverData,
            showPopover:show
        });
    }

    hideDetail = (e) =>{
        const {target, showColorPopover} = this.state;
        if(target !== e.target && !showColorPopover){
            this.setState({showPopover:false});
        }
    }

    handleDelete = (e, CRN) =>{
        this.props.deleteCourse(e,CRN);
        this.setState({showPopover:false});
    }

    assignColor = (event,start,end, isSelected) =>{
        const {CRN} = event.resource;
        const {selectedCourses} = this.props;
        let backgroundColor = "#" + selectedCourses[CRN].color;
        let style = {
            backgroundColor: backgroundColor
        }
        return {
            style:style
        };
    }

    changeColor = (CRN, color) =>{
        this.props.changeCourseColor(CRN,color);
    }

    setColorTarget = (e) =>{
        this.setState({
            showColorPopover:true
        });
    }

    Event = ({event}) =>{
        return(
            <span>
                <strong>{event.title}</strong>
                <br></br>
                {"CRN: " + event.resource.CRN}
            </span>
            
        );
    }



    render(){
        const {showPopover, target, popoverData, showColorPopover} = this.state;
        const {selectedCourses} = this.props;
        return(
            <div>
                <BigCalendar
                    formats={{
                        timeGutterFormat: (date, culture, localizer) =>
                        date.getMinutes() > 0
                        ? ''
                        : localizer.format(date, 'h A', culture),
                        dayFormat: 'ddd',
                    }}
                    events = {this.props.eventList}   
                    toolbar = {false}                 
                    views = {[Views.WORK_WEEK]}
                    defaultView = {Views.WORK_WEEK}
                    defaultDate={new Date(2018, 0, 1)}
                    min={new Date(2018, 0,1,7)}
                    max = {new Date(2018,0,6,23)}
                    localizer={localizer}
                    step={15}
                    timeslots={2}
                    onSelectEvent = {this.handleEventClick}
                    popup = {true}
                    components = {{event:this.Event}}
                    eventPropGetter = {this.assignColor}
                    style = {{backgroundColor:"white"}}
                />
                {popoverData !== null &&
                <div >
                <Overlay show = {showPopover} target = {target} rootClose = {true} onHide = {this.hideDetail}>
                    <Popover id = "popover-basic" >
                    <Button size = "sm" className = "btn-delete" onClick = {(e) => this.handleDelete(e, popoverData.CRN)} >
                        <img src = "../image/trashbin2.png" alt = {"x"} className = "trashbin"></img>
                    </Button> 
                    <Popover.Title as = "h3">
                        {popoverData.title}

                    </Popover.Title>
                    <Popover.Content>
                        {"CRN: " + popoverData.CRN}
                        <br/> 
                        {"Instructor: " + popoverData.instructor}
                        <br/>
                        {"Cred: " + popoverData.cred}
                        <br/>
                        {"Location: " + popoverData.location}
                        <br/>
                        Color:
                        <button 
                            style = {{backgroundColor:"#" + selectedCourses[popoverData.CRN].color, color: "#" + selectedCourses[popoverData.CRN].color}} 
                            className = "button-change-color"
                            onClick = {(e) => this.setColorTarget(e)}
                            >a
                        </button>
                    
                        <br/>
                    </Popover.Content>
                    </Popover>
                </Overlay>
                <Overlay show = {showColorPopover} target = {target} rootClose = {true} onHide = {() =>{this.setState({showColorPopover:false})}} placement = "right" >
                    <Popover id = "popover-basic" >
                        <Popover.Title as = "h3">Change Color</Popover.Title>
                        <Popover.Content>
                            {colorList.map((item,index) =>{
                                const buttonColor = "#" + item;
                                return(
                                    <React.Fragment  key = {item + index + popoverData.CRN + 3} >
                                        <span className = "span-padding"  key = {item + index + popoverData.CRN + 2}>
                                        <button 
                                            className = "button-color" 
                                            style = {{backgroundColor:buttonColor, color: buttonColor}} 
                                            onClick = {() =>{this.changeColor(popoverData.CRN, item)}}
                                            key = {item + index + popoverData.CRN  + 1}
                                        >
                                        a
                                        </button>
                                        </span>
                                        {(index + 1) % 5 === 0 && <br></br>}
                                    </React.Fragment>
                                );
                            })}
                        </Popover.Content>
                    </Popover>
                </Overlay>
                </div>
                }
            </div>
        );
    }
}
export default Calendar
