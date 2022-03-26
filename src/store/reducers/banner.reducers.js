import { bannerConstants } from "../actions/constaints";
const initState = {
  banner: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case bannerConstants.GET_BANNER_SUCCESS:
      state = { ...state, banner: action.payload.banner.data };
      break;
  }
  return state;
};
