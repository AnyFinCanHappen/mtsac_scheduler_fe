/*
Time format:
    days: M T W Th F S U
    time: 7:00am - 2:00pm

convert to Date object.
Use 1/1/2018 - 1/8/2018 for monday - sunday
*/

function dayToDate(day) {
  if (day === 'M') {
    return 1;
  } else if (day === 'T') {
    return 2;
  } else if (day === 'W') {
    return 3;
  } else if (day === 'Th') {
    return 4;
  } else if (day === 'F') {
    return 5;
  } else if (day === 'S') {
    return 6;
  } else if (day === 'U') {
    return 7;
  }
}

function timeToMilitary(time) {
  const timeNoSpace = String(time).replace(/\s+/g, '');
  const timeList = timeNoSpace.split('-');
  let timeObjectList = [];
  let timeFormat;
  let modifier;
  timeList.forEach((time) => {
    if (time.charAt(time.length - 2) === 'a') {
      timeFormat = time.slice(0, time.length - 2);
      modifier = 'AM';
    } else {
      timeFormat = time.slice(0, time.length - 2);
      modifier = 'PM';
    }
    let [hour, minute] = timeFormat.split(':');
    if (hour === '12') {
      hour = '00';
    }
    if (modifier === 'PM') {
      hour = parseInt(hour, 10) + 12;
    }
    timeObjectList.push({
      hour: hour,
      minute: minute,
    });
  });
  return timeObjectList;
}

function parseTime(course) {
  const { meetingTimes, name, instructor, location, cred } = course;
  const { meetings } = meetingTimes;
  let eventList = [];
  meetings.forEach((meeting, index) => {
    const { days, time, info } = meeting;
    if (info === 'available') {
      let dayList = String(days).split(' ');
      dayList.forEach((day) => {
        let startEndTime = timeToMilitary(time);
        let event = {
          title: name,
          start: new Date(
            2018,
            0,
            dayToDate(day),
            startEndTime[0].hour,
            startEndTime[0].minute
          ),
          end: new Date(
            2018,
            0,
            dayToDate(day),
            startEndTime[1].hour,
            startEndTime[1].minute
          ),
          allDay: false,
          resource: {
            instructor: instructor,
            CRN: course.CRN,
            location: location[index],
            cred: cred,
            isCustom: false,
          },
        };
        eventList.push(event);
      });
    }
  });
  return eventList;
}

function removeEvents(events, CRN) {
  let updatedEvents = [];
  events.forEach((event) => {
    const { resource } = event;
    if (resource.CRN !== CRN) {
      updatedEvents.push(event);
    }
  });
  return updatedEvents;
}

function convertResponseIntoDate(eventList) {
  let updatedEventList = [];
  eventList.forEach((item) => {
    let event = {
      title: item.title,
      start: new Date(item.start),
      end: new Date(item.end),
      resource: item.resource,
      allDay: item.allDay,
    };
    updatedEventList.push(event);
  });
  return updatedEventList;
}

function timeToMilitaryCustom(time) {
  let hour = time.hour;
  if (hour === '12') {
    hour = '00';
  }
  if (time.midday === 'pm') {
    hour = parseInt(hour, 10) + 12;
  }
  return {
    hour: hour,
    minute: time.minute,
  };
}

function parseTimeCustom(event) {
  const {
    title,
    startHour,
    startMinute,
    startMidday,
    endHour,
    endMinute,
    endMidday,
    isMonday,
    isTuesday,
    isWednesday,
    isThursday,
    isFriday,
    CRN,
  } = event;
  let eventList = [];
  let start = {
    hour: startHour,
    minute: startMinute,
    midday: startMidday,
  };
  let end = {
    hour: endHour,
    minute: endMinute,
    midday: endMidday,
  };
  let startTime = timeToMilitaryCustom(start);
  let endTime = timeToMilitaryCustom(end);
  let days = {
    isMonday: isMonday,
    isTuesday: isTuesday,
    isWednesday: isWednesday,
    isThursday: isThursday,
    isFriday: isFriday,
  };
  Object.keys(days).forEach((item) => {
    let day;
    if (days[item]) {
      if (item === 'isMonday') {
        day = 1;
      } else if (item === 'isTuesday') {
        day = 2;
      } else if (item === 'isWednesday') {
        day = 3;
      } else if (item === 'isThursday') {
        day = 4;
      } else {
        day = 5;
      }
      eventList.push({
        title: title,
        start: new Date(2018, 0, day, startTime.hour, startTime.minute),
        end: new Date(2018, 0, day, endTime.hour, endTime.minute),
        allDay: false,
        resource: {
          isCustom: true,
          CRN: CRN,
        },
      });
    }
  });
  return eventList;
}

export default {
  parseTime,
  removeEvents,
  convertResponseIntoDate,
  parseTimeCustom,
};
