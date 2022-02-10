class ActionFactory {
  payload;
  type;
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
  }
}

function pushEventAction(course) {
  return {
    ...new ActionFactory(PushEventActionType, { course }),
  };
}

function loadEventAction(course, eventList) {
  return {
    ...new ActionFactory(LoadEventActionType, {
      selectedCourses: course,
      eventList,
    }),
  };
}

function deleteEventAction(crn) {
  return {
    ...new ActionFactory(DeleteEventActionType, { crn }),
  };
}

function changeEventColorAction(crn, color) {
  return {
    ...new ActionFactory(ChangeEventColorActionType, { crn, color }),
  };
}

function pushCustomEventAction(event) {
  return {
    ...new ActionFactory(PushCustomEventActionType, { event }),
  };
}

export default {
  loadEventAction,
  pushEventAction,
  deleteEventAction,
  changeEventColorAction,
  pushCustomEventAction,
};
export const LoadEventActionType = 'LOAD_EVENT_ACTION';
export const PushEventActionType = 'PUSH_EVENT_ACTION';
export const DeleteEventActionType = 'DELETE_EVENT_ACTION';
export const ChangeEventColorActionType = 'CHANGE_EVENT_COLOR_ACTION';
export const PushCustomEventActionType = 'PUSH_CUSTOM_EVENT_ACTION';
