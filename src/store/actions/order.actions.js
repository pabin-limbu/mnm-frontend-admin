import axiosInstance from "../../helper/axios";
import { orderConstants } from "./constaints";

export const getOrder = (orderDate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GET_ORDER_REQUEST });
      const orders = await axiosInstance.get("/order/getorder", {
        params: { orderDate},
      });
      dispatch({
        type: orderConstants.GET_ORDER_SUCCESS,
        payload: { orders: orders.data.orders },
      });
    } catch (error) {
      dispatch({
        type: orderConstants.GET_ORDER_FAILURE,
      });
    }
  };
};

export const packOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.PACK_ORDER_REQUEST });
      const result = await axiosInstance.post("/order/packorder", {
        orderId,
      });
      if (result.status === 200) {
        dispatch({
          type: orderConstants.PACK_ORDER_SUCCESS,
          payload: result.data,
        });
      } else {
        dispatch({ type: orderConstants.PACK_ORDER_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
