import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from './useAuth';
import LoadingButton from '../components/Button';


const VerifyEmail = () => {
    const [digits, setDigits] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const navigate = useNavigate();
    const { checkVerifyCode, loading, error, setError } = useAuth();

    const handleChange = (index, value) => {
        const newDigits = [...digits];
        newDigits[index] = value;
        setDigits(newDigits);

        if (value && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index) => {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        setError(null);

        if (index > 0 && !inputRefs[index].current.value) {
            inputRefs[index - 1].current.focus();
        }

    };

    const handleSubmit = async () => {
        const result = digits.join("");
        const code = parseInt(result);
        const resp = await checkVerifyCode(code);

        if (resp) {
            navigate('/auth/login');
        }
    }

    return (
        <div className="container mt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h2 className="text-center mb-4">Verify Your Email</h2>
                        <hr />
                        <p className="lead text-center">We've sent a verification code to <strong>{localStorage.getItem('email_4_validate')}</strong></p>
                        <form>
                            <div className="form-group">
                                <div className="mb-3 row justify-content-center">
                                    {digits.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className={
                                                error ? "form-control col-2 mx-1 text-center fs-4 fw-medium text-danger border border-danger-subtle shake-input" :
                                                    "form-control col-2 mx-1 text-center fs-4 fw-medium text-secondary border border-secondary-subtle"
                                            }
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => !isNaN(e.target.value) && handleChange(index, e.target.value)}
                                            onKeyDown={(e) => e.key === 'Backspace' && handleKeyDown(index)}
                                            ref={inputRefs[index]}
                                            style={{ width: 10 + '%' }}
                                            required
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={!digits.every(item => item !== "")}>
                                    <LoadingButton name="Verify" is_loading={loading} />
                                </button>
                            </div>
                        </form>
                        <p className="mt-4 text-center">Didn't receive the code? <Link to="/auth/signup">Change email</Link>.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VerifyEmail;
