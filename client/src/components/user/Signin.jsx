import React, { useState } from 'react';
import './User.scss';
import { Link, useNavigate } from 'react-router-dom';
import login from '../../assets/login.png';
import { Login } from '../function/User';

export const Signin = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Logging in with:', user);
      const res = await Login(user);
      console.log('Response from Login:', res);

      if (res && res._id) {
        localStorage.setItem('email', res.email);
        localStorage.setItem('username', res.username);
        localStorage.setItem('isAdmin', JSON.stringify(res.isAdmin));
        localStorage.setItem('userInfo', JSON.stringify(res));

        setUser({
          email: '',
          password: ''
        });

        setError('');

        navigate('/');
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.log('Login failed:', error);
    }
  };

  return (
    <div className='login'>
      <div className='left-container'>
        <img src={login} alt='Login Illustration' />
      </div>
      <div className='right-container'>
        <h1>Welcome Back</h1>
        <p>Please login with your personal information by email address and password.</p>
        <div className='inputbox'>
          <label>Email</label>
          <input type='email' name='email' value={user.email} onChange={handleChange} />
        </div>
        <div className='inputbox'>
          <label>Password</label>
          <input type='password' name='password' value={user.password} onChange={handleChange} required />
        </div>
        {error && <div className='error'>{error}</div>}
        <div className='button-login'>
          <button onClick={LoginHandler}>Login</button>
        </div>
        <div className='or'>
          <p>or</p>
        </div>
        <div className='sigin-google'></div>
        <div className='p'>
          <p>Don't have an account? <Link to='/signup'>Signup</Link></p>
        </div>
      </div>
    </div>
  );
};
