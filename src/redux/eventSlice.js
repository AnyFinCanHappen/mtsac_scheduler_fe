import EventColors from '../constants/Colors.json';
import EventMaker from '../util/EventMaker';
import {
  PushEventActionType,
  LoadEventActionType,
  ChangeEventColorActionType,
  PushCustomEventActionType,
  DeleteEventActionType,
} from './eventActions';

const initialState = {
  eventList: [],
  selectedCourses: {},
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case LoadEventActionType: {
      return {
        ...action.payload,
      };
    }
    case PushEventActionType: {
      const { course } = action.payload;
      let { colorList } = EventColors;
      let { selectedCourses, eventList } = state;
      if (!selectedCourses[course.CRN]) {
        let events = EventMaker.parseTime(course);
        let courseInfo = {
          name: course.name,
          instructor: course.instructor,
          meetingTimes: course.meetingTimes,
          location: course.location,
          cred: course.cred,
          isCustom: false,
        };
        if (Object.keys(courseInfo).length >= 20) {
          courseInfo.color = '4363d8';
        } else {
          courseInfo.color = colorList[Object.keys(selectedCourses).length];
        }
        events.forEach((event) => {
          eventList.push(event);
        });
        selectedCourses[course.CRN] = courseInfo;
        return {
          selectedCourses,
          eventList,
        };
      }
      return state;
    }
    case DeleteEventActionType: {
      let { selectedCourses, eventList } = state;
      const { crn } = action.payload;
      delete selectedCourses[crn];
      let updatedEventList = EventMaker.removeEvents(eventList, crn);
      return {
        selectedCourses: selectedCourses,
        eventList: updatedEventList,
      };
    }
    case ChangeEventColorActionType: {
      const { crn, color } = action.payload;
      state.selectedCourses[crn].color = color;
      return {
        ...state,
      };
    }
    case PushCustomEventActionType: {
      const { event } = action.payload;
      let { eventList, selectedCourses } = state;
      let CRN = Math.random().toString(36).slice(2);
      if (selectedCourses[CRN]) {
        CRN = Math.random().toString(36).slice(2);
      }
      event.CRN = CRN;
      let customEventList = EventMaker.parseTimeCustom(event);
      customEventList.forEach((item) => {
        eventList.push(item);
      });
      let customEventInfo = {
        color: '4363d8',
        isCustom: true,
      };
      selectedCourses[CRN] = customEventInfo;
      return {
        selectedCourses,
        eventList,
      };
    }
    default:
      return state;
  }
}
