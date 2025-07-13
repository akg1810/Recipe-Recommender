import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoChevronBackCircleSharp } from "react-icons/io5"; // Import the icon
import '../styles/AuthPage.css'
import pic1 from '../assets/Mobile login-pana.png'

const AuthPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const modeParam = queryParams.get('mode');
        if (modeParam) {
            setMode(modeParam);
        }
    }, [location.search]);

    const toggleMode = () => {
        setMode(mode === 'login' ? 'register' : 'login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = mode === 'login'
                ? `${process.env.REACT_APP_API_URL}/api/auth/login`
                : `${process.env.REACT_APP_API_URL}/api/auth/register`;
            const payload = mode === 'login'
                ? { emailOrUsername, password }
                : { email, password, username };

            const response = await axios.post(url, payload);
            localStorage.setItem('token', response.data.token);
            navigate('/recommend');
        } catch (err) {
            setError(err.response ? err.response.data.error : 'Something went wrong');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        navigate('/'); // Navigate back to dashboard
    };

    return (
        <div className='auth-page'>
        {/* Back Icon placed outside the form */}
        <IoChevronBackCircleSharp 
            className="back-icon-outside" 
            size={50} 
            onClick={handleBack} 
        />
        <div className="auth-container flex plus-jakarta-sans-font">
            <div className="auth-card flex">
                <h1 >{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {mode === 'login' ? (
                        <>
                            <div className="auth-input-group">
                                <div className={`input-with-icon ${emailOrUsername ? 'not-empty' : ''}`}>
                                    <FaUser className="icon" />
                                    <label>Email or Username</label>
                                    <input
                                        type="text"
                                        value={emailOrUsername}
                                        onChange={(e) => setEmailOrUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <div className={`input-with-icon ${password ? 'not-empty' : ''}`}>
                                    <FaLock className="icon" />
                                    <label>Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="eye-icon" onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                </div>
                        </>
                    ) : (
                        <>
                            <div className="auth-input-group">
                                <div className={`input-with-icon ${email ? 'not-empty' : ''}`}>
                                    <FaEnvelope className="icon" />
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <div className={`input-with-icon ${username ? 'not-empty' : ''}`}>
                                    <FaUser className="icon" />
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="auth-input-group">
                                <div className={`input-with-icon ${password ? 'not-empty' : ''}`}>
                                    <FaLock className="icon" />
                                    <label>Password</label>
                                    <input
                                    
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span className="eye-icon" onClick={toggleShowPassword}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                    <button type="submit" className="auth-submit">
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                {mode === 'login' ? (
                    <div>
                        <p style={{fontSize:'20px'}}>
                            New user?{' '}
                            <button className="toggle-auth-mode " onClick={toggleMode}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                ) : (
                    <div>
                        <p style={{fontSize:'20px'}}>
                            Already have an account?{' '}
                            <button className="toggle-auth-mode" onClick={toggleMode}>
                                Login
                            </button>
                        </p>
                    </div>
                )}
            </div>
            <div className="auth-illustration">
                <img src={pic1} alt="Illustration" />
            </div>
            </div>
        </div>
    );
};

export default AuthPage;
