import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token")

	return token ? children : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
