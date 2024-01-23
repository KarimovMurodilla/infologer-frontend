import { useEffect } from "react";

import api from "../auth/Api";
import { Navigate } from "react-router-dom";


const CheckAuth = () => {
	useEffect(() => {
		const getMyData = async () => {
			try {
				const response = await api.get('/fastapi_users/me');
				localStorage.setItem('activeUser', JSON.stringify(response.data));
				return response.data;
			} catch (error) {
				if (error.response && error.response.status === 401) {
					localStorage.clear();
					<Navigate to="/auth/login" replace />
				}
			}			
		}
		getMyData()
	}, []);
};


export default CheckAuth;