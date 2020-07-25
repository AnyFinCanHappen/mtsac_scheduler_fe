import {Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import React, {Component} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Popover  from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';



const localizer = momentLocalizer(moment)
class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopover : false,
            target : null,
            popoverData : null
        };
    }

    handleEventClick = (event, e) =>{
        const {showPopover,target} = this.state;
        const {resource} = event;            
        let popoverData = {
            title: event.title,
            CRN: resource.CRN,
            location: resource.location,
            instructor: resource.instructor
        }
        this.setState({
            target:e.target,
            popoverData:popoverData
        })
        if(target !== e.target){
            this.setState({
                showPopover: true
            })
        }
        else{
            this.setState({
                showPopover: !showPopover
            })
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
                />
                {popoverData !== null &&
                <Overlay show = {showPopover} target = {target} >
                    <Popover id = "popover-basic">
                    <Popover.Title as = "h3">{popoverData.title}</Popover.Title>
                    <Popover.Content>
                        {"CRN: " + popoverData.CRN}
                        <br/> 
                        {"Instructor: " + popoverData.instructor}
                        <br/>
                        {"Location: " + popoverData.location}
                    </Popover.Content> 
                    </Popover>
                </Overlay>}
            </div>
        );
    }
}
export default Calendar
