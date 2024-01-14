import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, {apiSetHeader} from './Api';

const useAuth = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const signup = async (userData) => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await api.post('/auth/register', userData, config);

            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Signup failed');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    setError('This user is already exists');
                }
                else if (error.response.status === 422) {
                    setError(error.response.data.detail[0].msg);
                }
            }

            else {
                setError('An error occurred');
            }

        } finally {
            setLoading(false);
        }
    };

    const verify = async (userData) => {
        setLoading(true);
        try {
            const params = {
                'first_name': userData.first_name,
                'email': userData.email,
            };

            await api.post('/users/signup/verify', null, {
                params,
                headers: { 'Accept': 'application/json' }
            });

            localStorage.setItem('user', JSON.stringify(userData));      
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const checkVerifyCode = async (code) => {
        setLoading(true);
        try {
            const currentUser = JSON.parse(localStorage.getItem('user'));
            const params = {
                'email': currentUser.email,
                'code': code,
            };

            const response = await api.post('/users/signup/verify/check', null, {
                params,
                headers: { 'Accept': 'application/json' }
            });

            if (response.status === 200) {
                await signup(currentUser)
                return true;
            }
            
        } catch (error) {
            if (error.response.status === 401) {
                setError("The validation code you entered is incorrect. Please double-check and try again.");
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

            const response = await api.post('/auth/jwt/login', params, config);
            if (response.status === 200) {
                apiSetHeader('Authorization', `Bearer ${response.data.access_token}`)
                setToken(response.data.access_token);
                localStorage.setItem('token', response.data.access_token);

                navigate('/');
            }

        } catch (error) {
            if (error.response.status === 400) {
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
        setToken(null);
        setUser(null);
        // Redirect to login or home page
        navigate('/auth/login')
    };


    const refreshUserData = () => {
		api.get('/users/me')
			.then((response) => {
				localStorage.setItem('activeUser', JSON.stringify(response.data));
                return response.data;
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 401) {
						localStorage.removeItem("token")
					}
				}

			});
	};


    return { token, user, loading, error, signup, login, logout, verify, checkVerifyCode, setError, refreshUserData };
};

export default useAuth;
