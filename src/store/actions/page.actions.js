import axiosInstance from "../../helper/axios";
import { pageConstant } from "./constaints";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageConstant.CREATE_PAGE_REQUEST });
    try {
      const res = await axiosInstance.post("/page/create", form);
      if (res.status === 201) {
        dispatch({
          type: pageConstant.CREATE_PAGE_SUCCESS,
          payload: { page: res.data.body },
        });
      } else {
        dispatch({
          type: pageConstant.CREATE_PAGE_FAILURE,
          payload: { error: res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
