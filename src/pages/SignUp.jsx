import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            onChange={onChange}
            value={name}
            id="name"
            className="nameInput"
          />
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
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" height="34px" width="34px" />
            </button>
          </div>
        </form>
        {/* Google Auth */}
        <Link to="/signin" className="registerLink">
          Sign In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
