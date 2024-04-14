import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignUp.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignUp = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const onNameChangeHandler = e => {
    setName(e.target.value);
  };

  const onEmailChangeHandler = e => {
    setEmail(e.target.value);
  };

  const onPasswordChangeHandler = e => {
    setPassword(e.target.value);
  };

  const postData = async requestParams => {
    try {
      const API_ROOT = 'http://localhost:3000';
      const data = { ...requestParams.apiData };

      const response = await axios.post(
        `${API_ROOT}${requestParams.apiRoute}`,
        data
      );
      if (response.status >= 200 && response.status < 300) {
        setAction('Welcome');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      let errorMessage = 'Something Went Wrong!';
      const clientError = error?.response?.data?.message;
      if (clientError && Array.isArray(clientError)) {
        errorMessage = clientError[0];
      } else if (clientError) {
        errorMessage = clientError;
      }
      setErrMessage(errorMessage);
    }
  };

  const onSignUpClickHandler = async () => {
    setErrMessage('');
    if (action !== 'Sign Up') {
      setAction('Sign Up');
      setName('');
      setEmail('');
      setPassword('');
    } else {
      await postData({
        apiRoute: '/register',
        apiData: {
          username: name,
          email,
          password,
        },
      });
    }
  };

  const onLoginClickHandler = async () => {
    setErrMessage('');
    if (action !== 'Login') {
      setAction('Login');
      setName('');
      setEmail('');
      setPassword('');
    } else {
      await postData({
        apiRoute: '/auth/login',
        apiData: {
          username: email,
          password,
        },
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">
          {action === 'Welcome' ? 'Welcome to the application.' : action}
        </div>
        <div className="underline"></div>
      </div>
      <div className={action === 'Welcome' ? 'inputs hidden' : 'inputs'}>
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Name"
              onChange={onNameChangeHandler}
              value={name}
            />
          </div>
        )}
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            onChange={onEmailChangeHandler}
            value={email}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            onChange={onPasswordChangeHandler}
            value={password}
          />
        </div>
      </div>
      <div className="errorMessage">{errMessage}</div>
      <div
        className={
          action === 'Welcome' ? 'submit-container hidden' : 'submit-container'
        }
      >
        <div
          className={action === 'Login' ? 'submit gray' : 'submit'}
          onClick={onSignUpClickHandler}
        >
          Sign Up
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={onLoginClickHandler}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
