import { pageConstant } from "../actions";
const initialState = {
  error: null,
  loading: false,
  page: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case pageConstant.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case pageConstant.CREATE_PAGE_SUCCESS:
      state = { ...state, loading: false };
      break;
    case pageConstant.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
  }

  return state;
};
