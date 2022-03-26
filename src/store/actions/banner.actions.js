import { bannerConstants } from "./constaints";
import axiosInstance from "../../helper/axios";

export const addBanner = (form) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/banner/create", form);

      if (res.status === 200) {
        console.log(res);
      }
      //update redux
    } catch (error) {
      console.log(error);
    }
  };
};
export const getBanner = () => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.get("/banner/getbanner");
      if (res.status === 200) {
        dispatch({
          type: bannerConstants.GET_BANNER_SUCCESS,
          payload: { banner: res.data },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBanner = (bannerDetails) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/banner/delete", bannerDetails);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
};
