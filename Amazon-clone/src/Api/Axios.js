import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ama-backend-deploy.onrender.com/",
});

export { axiosInstance };
