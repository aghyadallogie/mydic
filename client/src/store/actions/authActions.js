import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,

} from "../actions/types";
import { helpRegisterUser } from "../helpers/index";
import { helpLoginUser } from "../helpers/index";
import { helpFetchMe } from "../helpers/index";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  const token = getState().auth.token || localStorage.getItem("auth-token"); // why user selector then why not always use the same as here ?!
  if (token) {
    try {
      const response = await helpFetchMe(tokenConfig(token));
      dispatch({
        type: USER_LOADED,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

export const registerAction = (body) => async (dispatch) => {
  try {
    const response = await helpRegisterUser(body);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data,
    });
  }
};

export const loginAction = (loginData) => async (dispatch) => {
  try {
    const response = await helpLoginUser(loginData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logoutAction = () => {
  return { type: LOGOUT_SUCCESS };
};

export const tokenConfig = (token) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["auth-token"] = token;
  }
  return config;
};
