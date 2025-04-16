import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension'; // ✅ modern version

// Reducers
import alertReducer from './reducers/alert';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
// import postReducer from './reducers/post';


const initialState = {};

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  // post: postReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
