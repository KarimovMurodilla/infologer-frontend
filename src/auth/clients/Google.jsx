import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import api, { apiSetHeader } from "../Api";
import LoadingSpinner from "../../components/Loading";


const GoogleOAuth = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const code = searchParams.get('code');
    const code_verifier = searchParams.get('code_verifier');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    const params = {
        'code': code,
        'code_verifier': code_verifier,
        'state': state,
        'error': error,
    };

    console.log(params);

    useEffect(() => {
        api.get('/auth/google/callback', {
            params,
            headers: { 'Accept': 'application/json' }
        })
            .then((response) => {
                if (response.status === 200) {
                    apiSetHeader('Authorization', `Bearer ${response.data.access_token}`)
                    localStorage.setItem('token', response.data.access_token);
    
                    navigate('/');
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    return (
        <div className="text-center">
            <LoadingSpinner />
        </div>
    );
}


export default GoogleOAuth;

// http://localhost:3000/auth/google/callback?state=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJmYXN0YXBpLXVzZXJzOm9hdXRoLXN0YXRlIiwiZXhwIjoxNzA1MTY3NzAzfQ.UivQtR9bhfHJwk4yDc5bR5sCW_i5RX8utoBteauSyu0&code=4%2F0AfJohXlhmYBCpAmYZ_UrBjU3Tc3t014oG4ipn49bKcfrlw9UmtCSmChLA3ehmDwDqDyO7g&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none