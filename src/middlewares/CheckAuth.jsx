import { useEffect } from "react";

import useAuth from "../auth/useAuth";


const CheckAuth = () => {
	const { refreshUserData } = useAuth();

	useEffect(() => {
		refreshUserData();
	}, []);
};


export default CheckAuth;