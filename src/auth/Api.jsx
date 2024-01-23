import axios from "axios";
import { Navigate } from "react-router-dom";

const JWTToken = localStorage.getItem('token');
const api = axios.create({
    baseURL: 'https://72db-37-110-214-39.ngrok-free.app/'
});


export const apiSetHeader = (name, value) => {
    if (value) {
        api.defaults.headers[name] = value;
    }
};

apiSetHeader('ngrok-skip-browser-warning', 'sim sim open');

if (JWTToken) {
    apiSetHeader('Authorization', `Bearer ${JWTToken}`);
}


api.interceptors.request.use(config => {
    if (!config.headers['Authorization']) {
        console.log("Not auth")
        {<Navigate to="/auth/login" replace />}
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
      {<Navigate to="/auth/login" replace />}
    }
    return Promise.reject(error);
  });


export default api;