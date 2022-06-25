import { orderConstants } from "../actions";

const initState = { orders: [], loading: false, error: false };

const getUpdatedOrder = (orders, orderToUpdate) => {
  const updatedOrder = orders.map((order) => {
    if (order._id == orderToUpdate.data._id) {
      return { ...order, orderStatus: orderToUpdate.data.orderStatus };
    } else {
      return { ...order };
    }
  });
  return updatedOrder;
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_ORDER_REQUEST:
      state = { ...state, loading: true, error: false };
      break;

    case orderConstants.GET_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
        loading: false,
        error: false,
      };
      break;

    case orderConstants.GET_ORDER_FAILURE:
      state = { ...state, loading: false };
      break;
    case orderConstants.PACK_ORDER_REQUEST:
      state = { ...state, loading: false };
      break;
    case orderConstants.PACK_ORDER_SUCCESS:
      const updatedOrders = getUpdatedOrder(state.orders, action.payload);
      state = { ...state, orders: updatedOrders, loading: false };
      break;
    case orderConstants.PACK_ORDER_FAILURE:
      state = { ...state, loading: false };
      break;
  }

  return state;
};
