import {Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import React, {Component} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popover  from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import "../css/delete_button.css"


const localizer = momentLocalizer(moment)
class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopover : false,
            target : null,
            prevTarget:null,
            popoverData : null
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
            cred:resource.cred
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

    Event = ({event}) =>{
        return(
            <span>
                <strong>{event.title}</strong>
                <br></br>
                {"CRN: " + event.resource.CRN}
            </span>
            
        );
    }

    testfunc = (e) =>{
        const {target} = this.state;
        if(target !== e.target){
            this.setState({showPopover:false});
        }
    }

    render(){
        const {showPopover, target, popoverData} = this.state;
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
                <Overlay show = {showPopover} target = {target} rootClose onHide = {this.testfunc}>
                    <Popover id = "popover-basic">
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
                    </Popover.Content>
                    </Popover>
                </Overlay>}
            </div>
        );
    }
}
export default Calendar
