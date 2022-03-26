import { userCommentConstants } from "../actions/constaints";
const initState = {
  comments: [],
  loading: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case userCommentConstants.GET_COMMENT_SUCCESS:
      state = { ...state, comments: action.payload.data.data };
      break;
  }
  return state;
};
