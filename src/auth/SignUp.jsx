import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

import useAuth from './useAuth';
import api from './Api';
import LoadingButton from '../components/Button';

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        is_active: true,
        is_superuser: false,
        is_verified: false
    });

    const [emailError, setError] = useState("")
    const [oauthUrl, setUrl] = useState("")
    const navigate = useNavigate();

    const { first_name, last_name, email, password } = formData;
    const allKeysHaveValues = !(first_name !== '' && last_name !== '' && email !== '' && password !== '');

    const { verify, loading } = useAuth();


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
			})
            .finally();
	}, []);

    const handleSubmit = async () => {
        const result = await validateEmail(formData.email);

        if (result) {
            localStorage.setItem('email_4_validate', formData.email);
            await verify(formData);
            navigate('/auth/verify');
        }
    };

    const validateEmail = async (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regex.test(email)) {
            const resp = await api.get('/users/check_email', {
                params: { email },
                headers: { 'Accept': 'application/json' }
            })

            // const data = await resp;
            if (resp.data.detail) {
                setError("This user is already exists.");
            } else {
                setError(null);
                return true;
            }

        } else {
            setError("The Email field must contain a valid email address.");
        }
    }

    return (
        <div className='container mt-5 mb-5'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className='text-center mb-3'>SignUp</h1>
                        <hr />
                        <form>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={'form-control'}
                                    id="floatingInput"
                                    placeholder="First name"
                                    onChange={(e) => setFormData({ ...formData, ['first_name']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput" className='text-secondary'>First name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={'form-control'}
                                    id="floatingInput"
                                    placeholder="Last name"
                                    onChange={(e) => setFormData({ ...formData, ['last_name']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput" className='text-secondary'>Last name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className={emailError ? 'form-control is-invalid' : 'form-control'}
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setFormData({ ...formData, ['email']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput" className='text-secondary'>Email address</label>
                                <div className="invalid-feedback">
                                    {emailError ? emailError : ''}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className={'form-control'}
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(e) => setFormData({ ...formData, ['password']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingPassword" className='text-secondary'>Password</label>
                            </div>

                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={allKeysHaveValues} >
                                    <LoadingButton name="SignUp" is_loading={loading} />
                                </button>
                            </div>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                            </div>
                            <div className="d-grid gap-2 mb-5">
                                <a className="btn btn-outline-secondary" href={oauthUrl} role="button">
                                    <FcGoogle className='fs-2' />  SignUp with Google
                                </a>
                            </div>
                            <div className="text-center mb-4">
                                <p>Already have an account? <Link to="/auth/login">Login</Link></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;
