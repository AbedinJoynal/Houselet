import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form>
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            value={email}
            onChange={onChange}
            id="email"
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Password"
              onChange={onChange}
              id="password"
              className="passwordInput"
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgotpassword" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" height="34px" width="34px" />
            </button>
          </div>
        </form>
        {/* Google Auth */}
        <Link to="/signup" className="registerLink">
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
