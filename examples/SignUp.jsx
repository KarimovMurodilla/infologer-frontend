import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';
import api from './Api';

const Signup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        is_active: true,
        is_superuser: false,
        is_verified: false,
        about: '',
        username: ''
    });

    const [valError, setError] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });

    const { signup, loading, error } = useAuth();

    const handleSubmit = async () => {
        validate();

        console.log(valError);
        console.log(formData);
        // if (valError.first_name === null && valError.last_name === null && valError.email === null && valError.password === null) {
        //     console.log("Sweet!");
        // }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (regex.test(email)) {
            api.get('http://localhost:8000/users/check_email', {
                params: { email },
                headers: { 'Accept': 'application/json' }
            })
                .then(response => {
                    if (response.data.detail) {
                        setError((prevErrors) => ({ ...prevErrors, email: "This user is already exists." }));
                    } else {
                        setError((prevErrors) => ({ ...prevErrors, email: null }));
                    }

                })
                .catch(error => {
                    console.error('Error:', error);
                });

        } else {
            setError((prevErrors) => ({ ...prevErrors, email: "The Email field must contain a valid email address." }));
        }
    }

    const validate = () => {
        if (!formData.first_name) {
            setError((prevErrors) => ({ ...prevErrors, first_name: "Please enter your first name." }));
        } else {
            setError((prevErrors) => ({ ...prevErrors, first_name: null }));
        }

        if (!formData.last_name) {
            setError((prevErrors) => ({ ...prevErrors, last_name: "Please enter your last name." }));
        } else {
            setError((prevErrors) => ({ ...prevErrors, last_name: null }));
        }

        if (!formData.password) {
            setError((prevErrors) => ({ ...prevErrors, password: "Please enter your password." }));
        } else {
            setError((prevErrors) => ({ ...prevErrors, password: null }));
        }

        validateEmail(formData.email);
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
                                    className={valError.first_name ? 'form-control is-invalid' : 'form-control'}
                                    id="floatingInput"
                                    placeholder="First name"
                                    onChange={(e) => setFormData({ ...formData, ['first_name']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput">First name</label>
                                <div className="invalid-feedback">
                                    {valError.first_name ? valError.first_name : ''}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className={valError.last_name ? 'form-control is-invalid' : 'form-control'}
                                    id="floatingInput"
                                    placeholder="Last name"
                                    onChange={(e) => setFormData({ ...formData, ['last_name']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput">Last name</label>
                                <div className="invalid-feedback">
                                    {valError.last_name ? valError.last_name : ''}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className={valError.email ? 'form-control is-invalid' : 'form-control'}
                                    id="floatingInput"
                                    placeholder="name@example.com"
                                    onChange={(e) => setFormData({ ...formData, ['email']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingInput">Email address</label>
                                <div className="invalid-feedback">
                                    {valError.email ? valError.email : ''}
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password"
                                    className={valError.password ? 'form-control is-invalid' : 'form-control'}
                                    id="floatingPassword"
                                    placeholder="Password"
                                    onChange={(e) => setFormData({ ...formData, ['password']: e.target.value })}
                                    required
                                />
                                <label htmlFor="floatingPassword">Password</label>
                                <div className="invalid-feedback">
                                    {valError.password ? valError.password : ''}
                                </div>
                            </div>
                            <div className="text-center mb-4">
                                <p>Already have an account? <Link to="/login">Login</Link></p>
                            </div>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                                    {
                                        loading ?
                                            <div>
                                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                <span role="status">Loading...</span>
                                            </div> :
                                            'SignUp'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;
