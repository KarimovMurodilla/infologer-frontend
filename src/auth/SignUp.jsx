import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';
import LoadingSpinner from '../components/Loading';

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
    const { signup, loading, error } = useAuth();

    const handleSubmit = async () => {
        await signup(formData);
    };

    return (
        <div className='container mt-5 mb-5'>
            <h1 className='text-center mb-3'>SignUp</h1>
            <form>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={error ? 'form-control is-invalid' : 'form-control'}
                        id="floatingInput"
                        placeholder="First name"
                        onChange={(e) => setFormData({ ...formData, ['first_name']: e.target.value })}
                        required
                    />
                    <label htmlFor="floatingInput">First name</label>
                    <div className="invalid-feedback">
                        {error ? error : ''}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={error ? 'form-control is-invalid' : 'form-control'}
                        id="floatingInput"
                        placeholder="Last name"
                        onChange={(e) => setFormData({ ...formData, ['last_name']: e.target.value })}
                        required
                    />
                    <label htmlFor="floatingInput">Last name</label>
                    <div className="invalid-feedback">
                        {error ? error : ''}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className={error ? 'form-control is-invalid' : 'form-control'}
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) => setFormData({ ...formData, ['email']: e.target.value })}
                        required
                    />
                    <label htmlFor="floatingInput">Email address</label>
                    <div className="invalid-feedback">
                        {error ? error : ''}
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={error ? 'form-control is-invalid' : 'form-control'}
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(e) => setFormData({ ...formData, ['password']: e.target.value })}
                        required
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <div className="invalid-feedback">
                        {error ? error : ''}
                    </div>
                </div>
                <div className="text-center mb-4">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}><LoadingSpinner /></button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
