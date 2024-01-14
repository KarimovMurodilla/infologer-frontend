import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import useAuth from './useAuth';
import api from './Api';
import LoadingButton from '../components/Button';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [oauthUrl, setUrl] = useState("")

    const { error, login, loading } = useAuth();

    const allKeysHaveValues = !(username !== '' && password !== '');

    useEffect(() => {
        const params = {
            scopes: ['email', 'profile'],
        };
		api.get('/auth/google/authorize', {
            params,
            headers: {
                'Accept': 'application/json',
            },
        })
			.then((response) => {
                setUrl(response.data.authorization_url);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

    const handleLogin = async () => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        await login(params);
    };

    return (
        <div className='container mt-5'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className='text-center mb-3'>Login</h1>
                        <hr/>

                        <form>
                            <div className="form-floating mb-3">
                                <input type="email" className={error ? 'form-control is-invalid' : 'form-control'} id="floatingInput" placeholder="name@example.com" onChange={(e) => setUsername(e.target.value)} required />
                                <label htmlFor="floatingInput">Email address</label>
                                <div className="invalid-feedback">
                                    {error ? error : ''}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="password" className={error ? 'form-control is-invalid' : 'form-control'} id="floatingPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="invalid-feedback">
                                    {error ? error : ''}
                                </div>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={handleLogin} disabled={allKeysHaveValues}>
                                    <LoadingButton name="Login" is_loading={loading} />
                                </button>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>
                            <div className="d-grid gap-2 mb-5">
                                <a className="btn btn-outline-secondary" href={oauthUrl} role="button">
                                    <FcGoogle className='fs-2' />  Login with Google
                                </a>
                            </div>
                            <div className="text-center mb-4">
                                <p>Don't have an account? <Link to="/auth/signup">Register</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Login;
