import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const auth = getAuth();
  const [formdata, setFormdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formdata;
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          logout
        </button>
      </header>
    </div>
  );
};

export default Profile;
