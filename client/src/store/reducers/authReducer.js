import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {
    _id: null,
  },
  errMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        token: localStorage.getItem("auth-token"),
        isLoading: true,
      };
    case USER_LOADED:
      let loadedState = {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: { ...state.user, ...action.payload },
        errMsg: "",
      };
      return loadedState;
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("auth-token", action.payload.token);
      let loggedState = {
        ...state,
        token: localStorage.getItem("auth-token"),
        user: { ...state.user, ...action.payload }, // cuz payload already has user and token sent from api
        isAuthenticated: true,
        isLoading: false,
        errMsg: "",
      };
      return loggedState;
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem("auth-token");
      return {
        ...state,
        token: null,
        user: {},
        isAuthenticated: false,
        isLoading: false,
        errMsg: action.payload.errMsg,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("auth-token");
      return {
        ...state,
        token: null,
        user: {},
        isAuthenticated: false,
        isLoading: false,
        errMsg: action.payload,
      };
    default:
      return state;
  }
}
