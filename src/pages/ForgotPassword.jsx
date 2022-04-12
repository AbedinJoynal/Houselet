import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const onChange = (e) => setEmail(e.target.value);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success('Email was sent');
        } catch (error) {
            toast.error('Could not send reset email')
        }
    };
    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">ForgotPassword</p>
            </header>
            <main>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        value={email}
                        id="email"
                        onChange={onChange}
                        placeholder="Email"
                    />
                    <Link to={'/signin'} className="forgotPasswordLink">
                        Sign In
                    </Link>
                    <div className="signInBar">Send Reset Link</div>
                    <div className="signInText">
                        <button className="signInButton">
                            <ArrowRightIcon
                                fill="#ffffff"
                                width="34px"
                                height="34px"
                            />
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ForgotPassword;
