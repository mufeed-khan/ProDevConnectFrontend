import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
  NO_REPOS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null // Add this
      };
    case CLEAR_PROFILE:
    case ACCOUNT_DELETED:
      return {
        ...state,
        profile: null,
        repos: [],
      };
      case NO_REPOS:
      return {
        ...state,
        repos: []
      };
      case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export default profileReducer;

