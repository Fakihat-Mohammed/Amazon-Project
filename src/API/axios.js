import axios from "axios";

const axiosInstance = axios.create({
 
  // deployed version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-q1oo.onrender.com/",
});
export { axiosInstance };
