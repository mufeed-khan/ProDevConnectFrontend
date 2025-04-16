import {v4 as uuidv4} from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types';  
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuidv4(); // Generate a unique ID for the alert
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }, // Include the ID in the payload
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout); // Use the ID to remove the alert after the timeout
}
