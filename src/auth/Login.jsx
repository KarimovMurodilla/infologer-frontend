import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from './useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { error, login } = useAuth();

    const handleLogin = async () => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        await login(params);
    };

    return (
        <div className='container mt-5'>
            <h1 className='text-center mb-3'>Login</h1>

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
                <div className="text-center mb-4">
                    <p>Not a member? <Link to="/signup">Register</Link></p>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button" onClick={handleLogin}>Login</button>
                </div>
            </form>
        </div>
    );
};




export default Login;
