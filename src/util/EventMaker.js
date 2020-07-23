/*
Time format:
    days: M T W Th F S U
    time: 7:00am - 2:00pm

convert to Date object.
Use 1/1/2018 - 1/8/2018 for monday - sunday
*/

function dayToDate(day){
    if(day === "M"){
        return 1;
    }
    else if(day === "T"){
        return 2;
    }
    else if(day === "W"){
        return 3;
    }
    else if (day === "Th"){
        return 4;
    }
    else if(day === "F"){
        return 5;
    }
    else if(day === "S"){
        return 6;
    }
    else if(day === "U"){
        return 7;
    }
}

function timeToMilitary(time){
    const timeNoSpace = String(time).replace(/\s+/g, '');
    const timeList = timeNoSpace.split("-");
    let timeObjectList = [];
    let timeFormat;
    let modifier;
    timeList.forEach(time =>{
        if(time.charAt(time.length - 2) === 'a'){
            timeFormat = time.slice(0,time.length - 2);
            modifier = "AM";
        }
        else{
            timeFormat = time.slice(0,time.length - 2);
            modifier = "PM";
        }
        let [hour,minute] = timeFormat.split(":");
        if(hour === "12"){
            hour = "00";
        }
        if(modifier === "PM"){
            hour = parseInt(hour,10) + 12;
        }
        timeObjectList.push({
            hour:hour,
            minute: minute
        })
    })
    return timeObjectList;
}


function parseTime(course) {
    const {meetingTimes, name, instructor} = course;
    const {meetings} = meetingTimes;
    let eventList = [];
    meetings.forEach(meeting =>{
        const {days,time,info} = meeting;
        if(info === "available"){
            let dayList = String(days).split(" ");
            dayList.forEach(day =>{
                let startEndTime = timeToMilitary(time);
                let event = {
                    title:name,
                    start: new Date(2018,0, dayToDate(day), startEndTime[0].hour, startEndTime[0].minute),
                    end: new Date(2018,0, dayToDate(day), startEndTime[1].hour, startEndTime[1].minute),
                    allDay:false,
                    resourse:{
                        instructor:instructor
                    }
                }
                eventList.push(event)    
            })
        }
    })
    return eventList;
}

export default {
    parseTime
};
