import { combineReducers } from 'redux';
import eventReducer from './eventSlice';

const rootReducer = combineReducers({
  events: eventReducer,
});

export default rootReducer;
