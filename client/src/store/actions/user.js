import * as types from "./types";

import axios from "axios";
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: types.USER_LOGOUT,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    // dispatch({
    //   type: types.USER_LOGIN_REQUEST,
    // });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    console.log(data);
    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("token", JSON.stringify(data));
  } catch (error) {
    let { response } = error;
    dispatch({
      type: types.USER_LOGIN_FAIL,
      payload: response.data.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_DETAILS_REQUEST,
    });
    let { token } = JSON.parse(localStorage.getItem("token"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(token);
    const { data } = await axios.get(`/api/users/profile/${id}`, config);
    // console.log(data);
    dispatch({
      type: types.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
