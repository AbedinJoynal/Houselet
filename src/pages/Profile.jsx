import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { updateDoc,doc} from 'firebase/firestore';
import { db } from '../firebase.config';
import {toast} from 'react-toastify'
const Profile = () => {
    const auth = getAuth();
    const [changedetails, setChangedetails] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;
    const navigate = useNavigate();
    const onLogout = () => {
        auth.signOut();
        navigate('/');
    };
    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                await updateProfile(auth.currentUser, {
                    displayName: name,
                });
                const userRef=doc(db,'users',auth.currentUser.uid)
                await updateDoc(userRef,{
                    name
                })
            }
        } catch (error) {
            toast.error('Could Not Update')
        }
    };
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };
    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type="button" className="logOut" onClick={onLogout}>
                    logout
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">Personal Details</p>
                    <p
                        className="changePersonalDetails"
                        onClick={() => {
                            changedetails && onSubmit();
                            setChangedetails((prevState) => !prevState);
                        }}
                    >
                        {changedetails ? 'done' : 'change'}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={
                                !changedetails
                                    ? 'profileName'
                                    : 'profileNameActive'
                            }
                            disabled={!changedetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className={
                                !changedetails
                                    ? 'profileEmail'
                                    : 'profileEmailActive'
                            }
                            disabled={!changedetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Profile;
