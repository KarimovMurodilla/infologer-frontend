import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signup = async (userData) => {
        console.log(userData);

        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post('http://localhost:8000/auth/register', userData, config);

            if (response.status == 201) {
                navigate('/login');
            } else {
                setError('Signup failed');
            }
        } catch (error) {
            console.log(error.response.data.detail[0].msg)

            if (error.response.status == 400) {
                setError('This user already exists');
            }
            else if (error.response.status == 422) {
                setError(error.response.data.detail[0].msg); 
            }
            else {
                setError('An error occurred');
            }
            
        } finally {
            setLoading(false);
        }
    };

    const login = async (params) => {
        setLoading(true);
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            };

            const response = await axios.post('http://localhost:8000/auth/jwt/login', params, config);
            
            if (response.status == 200) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                navigate('/');
            }

        } catch (error) {
            if (error.response.status == 400) {
                setError('Invalid credentials'); 
            }
            else {
                console.error('Login error:', error.response);
                setError('An error occurred');                
            }

        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Clear user data if stored
        setToken(null);
        setUser(null);
        // Redirect to login or home page
        navigate('/login')
    };


    return { token, user, loading, error, signup, login, logout };
};

export default useAuth;
