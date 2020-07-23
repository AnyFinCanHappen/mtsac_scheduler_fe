import {Calendar as BigCalendar, Views, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import React, {Component} from 'react';
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)
class Calendar extends Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }

    render(){
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
                    views = {[Views.WEEK]}
                    defaultView = {Views.WEEK}
                    defaultDate={new Date(2018, 0, 1)}
                    min={new Date(2018, 0, 1,7)}
                    max = {new Date(2018,0,8,23)}
                    localizer={localizer}
                    step={15}
                    timeslots={2}
                />
            </div>
        )
    }
}
export default Calendar
