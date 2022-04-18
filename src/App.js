import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './pages/SignUp';
import Category from './pages/Category';
import CreateListing from './pages/CreateListing.jsx';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Explore />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/category/:categoryName" element={<Category />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/forgotpassword"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/create-listing"
                        element={<CreateListing />}
                    />
                </Routes>
                <Navbar />
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
