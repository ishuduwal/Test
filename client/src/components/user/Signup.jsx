import React, { useState } from 'react';
import './User.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Register } from '../function/User';

export const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        mobilenumber: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Register(user);
            console.log('Response from Register:', response);
            if (response) {
                console.log('Account created successfully');
                window.localStorage.setItem('email', response.user.email);
                window.localStorage.setItem('username', response.user.username);
                window.localStorage.setItem('isAdmin', JSON.stringify(response.user.isAdmin));
                window.localStorage.setItem('userInfo', JSON.stringify(response.user));
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.log('Account creation failed:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div className='signup'>
            <div className='inputbox'>
                <label>Email</label>
                <input type='email' name='email' value={user.email} onChange={handleInputChange} />
            </div>
            <div className='inputbox'>
                <label>Username</label>
                <input type='text' name='username' value={user.username} onChange={handleInputChange} />
            </div>
            <div className='inputbox'>
                <label>Password</label>
                <input type='password' name='password' value={user.password} onChange={handleInputChange} />
            </div>
            <div className='inputbox'>
                <label>Mobile Number</label>
                <input type='number' name='mobilenumber' value={user.mobilenumber} onChange={handleInputChange} />
            </div>
            <div className='button-signup'>
                <button onClick={handleSubmit}>Create An Account</button>
            </div>
            <div className='or'>
                <p>or</p>
            </div>
            <div className='sigup-google'></div>
            <div className='p'>
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    );
};
