import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';

import { setAlert } from './alert'; // Import the setAlert action
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// lodeUser
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // ✅ sets token to axios default headers
  }
  try {
    const res = await axios.get(
      'https://prodevconnectbackend-4.onrender.com/api/auth'
    );

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post(
        'https://prodevconnectbackend-4.onrender.com/api/users/register',
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser()); // Load user after successful registration
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors && Array.isArray(errors)) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      } else {
        // Fallback in case there's no detailed error from server
        dispatch(setAlert('User Already Exsist', 'danger'));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//Login User

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'https://prodevconnectbackend-4.onrender.com/api/auth/login',
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser()); // Load user after successful login
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    } else {
      dispatch(setAlert('Invalid Credentials', 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout //clear profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
