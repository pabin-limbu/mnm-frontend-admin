/**creating instance of axios so that it can be reused.*/

import axios from "axios";
import { api } from "../urlConfig";
import store from "../store/store";
import { authConstants } from "../store/actions/constaints";
/**send token in headers:--> api will check if valid user or not */
const token = window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token
      ? `Bearer ${window.localStorage.getItem("token")}`
      : null,
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    //since above way of sending token is sending old token so this function is sending new token .
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

//handle the response before the try catch.
axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status === 500 || status === 400) {
      localStorage.clear();
      store.dispatch({ type: authConstants.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
