import { userConstants } from "./constaints";
import axiosInstance from "../../helper/axios";
/*SIGN UP */
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axiosInstance.post("/admin/signup", { ...user });

    if (res.status === 200) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
