import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import {Routes} from 'react-router'
import LandingPage from './Components/LandingPage';
import RegisterPage from './Components/RegisterPage';
import setAuthToken from './reducers/utils/setAuthToken';
import { Fragment, useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/auth';
import Dashboard from './Components/dashboard/Dashboard';
import Navbar from './Components/Navbar'
import RequireAuth from './Components/routing/requireAuth';
import CreateProfile from './Components/profile-forms/CreateProfile';
import Profile from './Components/Profile';
import Shop from './Components/shop/Shop';
import Chat from './Components/Chat/Chat';
import Profiles from './Components/profiles/Profiles';
import OtherUserProfile from './Components/profiles/OtherUserProfile';



if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
  useEffect(
    ()=>{store.dispatch(loadUser())}
    ,[]
  )
  return (
    <Router>
    <div className="App">
   <Routes>
      <Route exact path='/' element={<LandingPage/>}/>
      <Route exact path="/register" element={<RegisterPage/>}/>
      <Route exact path='/dashboard' element={
                  <RequireAuth redirectTo='/'>
                    <Navbar/>
                    <Dashboard/>
                  </RequireAuth>
                    }/>
      <Route exact path='/profiles' element={<Profiles/>}/>
      <Route exact path="/dashboard/create-profile" element={
                  <RequireAuth redirectTo='/'>
                    <CreateProfile/>
                  </RequireAuth>}/>
      <Route exact path="/profile" element={
                  <RequireAuth redirectTo='/'>
                          <Navbar/>
                          <Profile/>
                  </RequireAuth>
      } />
      <Route exact path="/profile/:userId" element={
                  <Fragment>
                  <Navbar/>
                  <OtherUserProfile/>
                  </Fragment>
                  }/>
      <Route exact path="/shop" element={
                  <RequireAuth redirectTo='/'>
                          <Navbar/>
                          <Shop/>
                  </RequireAuth>
      } />
      <Route exact path="/chat" element={
                  <RequireAuth redirectTo='/'>
                          <Navbar/>
                          <Chat/>
                  </RequireAuth>
      } />
    </Routes> 
      
    </div>
    </Router>
  );
}

export default App;
