import axiosInstance from "../../helper/axios";
import { categoryConstant } from "./constaints";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

    const res = await axiosInstance.get("/category/getcategory");

    if (res.status === 200) {
      //console.log(res);
      const { categoryList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        payload: {
          error: res.data.error,
        },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.ADD_NEW_CATEGORY_REQUEST });

    try {
      const res = await axiosInstance.post("/category/create", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstant.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      const { status } = error.response;
      console.log(error.response);
      console.log(status);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.UPDATE_CATEGORY_REQUEST });
    //console.log(...form);
    const res = await axiosInstance.post("/category/updateCategory", form);

    console.log(res);
    // if (res.status == 201) {
    //   dispatch(getAllCategory());
    //   dispatch({ type: categoryConstant.UPDATE_CATEGORY_SUCCESS }); // fetching category might take some time -- show some loader while fetching cat.
    // } else {
    //   const { error } = res.data;
    //   dispatch({
    //     type: categoryConstant.UPDATE_CATEGORY_FAILURE,
    //     payload: { error },
    //   });
    // }
  };
};
export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.DELETE_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/delete", {
      payload: { ids },
    });
    if (res.status == 201) {
      dispatch({ type: categoryConstant.DELETE_CATEGORY_SUCCESS });
      dispatch(getAllCategory());
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryConstant.DELETE_CATEGORY_FAILURE,
        payload: { error },
      });
    }
  };
};

export { getAllCategory };
