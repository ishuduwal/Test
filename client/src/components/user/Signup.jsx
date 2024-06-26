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

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validate = () => {
        let errors = {};
        let isValid = true;

        if (!user.username || user.username.length < 6) {
            isValid = false;
            errors['username'] = 'Username must be at least 6 characters long';
        }

        if (!user.email) {
            isValid = false;
            errors['email'] = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            isValid = false;
            errors['email'] = 'Email is invalid';
        }

        if (!user.password || user.password.length < 6) {
            isValid = false;
            errors['password'] = 'Password must be at least 6 characters long';
        }

        if (!user.mobilenumber) {
            isValid = false;
            errors['mobilenumber'] = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(user.mobilenumber)) {
            isValid = false;
            errors['mobilenumber'] = 'Mobile number must be exactly 10 digits';
        }

        setErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
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
                {errors.email && <div className='error'>{errors.email}</div>}
            </div>
            <div className='inputbox'>
                <label>Username</label>
                <input type='text' name='username' value={user.username} onChange={handleInputChange} />
                {errors.username && <div className='error'>{errors.username}</div>}
            </div>
            <div className='inputbox'>
                <label>Password</label>
                <input type='password' name='password' value={user.password} onChange={handleInputChange} />
                {errors.password && <div className='error'>{errors.password}</div>}
            </div>
            <div className='inputbox'>
                <label>Mobile Number</label>
                <input type='number' name='mobilenumber' value={user.mobilenumber} onChange={handleInputChange} />
                {errors.mobilenumber && <div className='error'>{errors.mobilenumber}</div>}
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
