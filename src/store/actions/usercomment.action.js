import { userCommentConstants } from "./constaints";
import axiosInstance from "../../helper/axios";

export const addComment = (data) => {
  return async (dispatch) => {
    console.log("add comment action reached");
    console.log(data);
    try {
      const res = await axiosInstance.post("/comment/create", data);
      if (res.status === 200) {
        dispatch({
          type: userCommentConstants.CREATE_NEW_COMMENT_SUCCESS,
          payload: { data: res.data },
        });
      }
      if (res.status === 400) {
        console.log("fail to insert data");
        dispatch({ type: userCommentConstants.CREATE_NEW_COMMENT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const getComment = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/comment/getcomment");
      if (res.status === 200) {
        dispatch({
          type: userCommentConstants.GET_COMMENT_SUCCESS,
          payload: { data: res.data },
        });
      }
      if (res.status === 400) {
        console.log("fail to fetch data");
        dispatch({ type: userCommentConstants.GET_COMMENT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteComment = (id) => {
  return async () => {
    console.log(id);
    const res = axiosInstance.post("comment/delete", { id });
  };
};
