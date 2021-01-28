/**creating instance of axios so that it can be reused.*/

import axios from "axios";
import { api } from "../urlConfig";
const axiosInstance = axios.create({
  baseURL: api,
});

export default axiosInstance;
