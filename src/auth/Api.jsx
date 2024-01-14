import axios from "axios";
import { useNavigate } from "react-router-dom";

const JWTToken = localStorage.getItem('token');
const api = axios.create({
    baseURL: 'http://localhost:8000'
});


export const apiSetHeader = (name, value) => {
    if (value) {
        api.defaults.headers[name] = value;
    }
};

if (JWTToken) {
    apiSetHeader('Authorization', `Bearer ${JWTToken}`)
}


api.interceptors.request.use(config => {
    if (!config.headers['Authorization']) {
        console.log("Not auth")
    }

    return config;
}, error => {
    return Promise.reject(error);
});


api.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response && error.response.status === 401) {
      // Token expired, redmove from local storage
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  });


export default api;