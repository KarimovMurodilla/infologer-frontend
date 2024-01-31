import React from 'react';
import { Navigate } from 'react-router-dom';
import api from './Api';

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token")
	
	api.get('/fastapi_users/me')
		.then((response) => {
			localStorage.setItem('activeUser', JSON.stringify(response.data));
			return children;
		})
		.catch((error) => {
			if (error.response && error.response.status === 401) {
				localStorage.clear();
				return <Navigate to="/auth/login" replace />;
			}
			
		});

	return token ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
