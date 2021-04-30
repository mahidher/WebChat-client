import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";

export const login = (id) => (dispatch) => {
  const data = { userId: id };
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_LOGIN_FAIL,
    });
  }

  localStorage.setItem("userId", JSON.stringify(data));
};
