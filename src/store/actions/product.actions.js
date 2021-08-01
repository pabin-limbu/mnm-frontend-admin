import axiosInstance from "../../helper/axios";
import { productConstaints } from "./constaints";
export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axiosInstance.post("/product/create", form);
    console.log(res);
  };
};

export const updateProduct = (form) => {
  return async (dispatch) => {
    console.log("i am here");
    dispatch({ type: productConstaints.UPDATE_PRODUCT_REQUEST });
    for (var pair of form.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const res = await axiosInstance.post("/product/update", form);
    console.log(res);
  };
};
