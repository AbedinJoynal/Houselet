import React from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import googleIcon from '../assets/svg/googleIcon.svg';
const OAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp(),
                });
            }
            navigate('/');
        } catch (error) {
            toast.error('Cannot Sign In');
        }
    };
    return (
        <div className='socialLogin'>
        <p>Google Sign {location.pathname === '/signup' ? 'up' : 'in'}</p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
          <img className='socialIconImg' src={googleIcon} alt='google' />
        </button>
      </div>
    );
};

export default OAuth;
