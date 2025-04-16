import React, { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/layout/NotFound';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Alert />

        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='profile/:id' element={<Profile />} />
          <Route
            path='/dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path='create-profile'
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path='add-education'
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route
            path='add-experience'
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
