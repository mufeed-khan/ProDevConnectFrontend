import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
// This reducer handles the alert state in the Redux store. It manages the alerts that are displayed to the user, such as success or error messages. The reducer listens for two action types: SET_ALERT and REMOVE_ALERT. When an alert is set, it adds the alert to the state. When an alert is removed, it filters out the alert with the specified ID from the state.
// The initial state is an empty array, which will hold the alerts. The reducer returns the current state by default if no action matches.
const initialState = [];

function alertReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;
