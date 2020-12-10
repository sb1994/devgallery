import * as types from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  userInfo: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        token: action.payload.token,
      };
    case types.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case types.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case types.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default auth;
