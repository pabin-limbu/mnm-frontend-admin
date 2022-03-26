import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authReducers from "./auth.reducers";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import pageReducer from "./page.reducer";
import bannerReducer from "./banner.reducers";
import userCommentReducer from "./usercomment.reducers";
const rootreducer = combineReducers({
  auth: authReducers,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  page: pageReducer,
  banner: bannerReducer,
  userComment: userCommentReducer,
});

export default rootreducer;
