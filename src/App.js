import AppNavBar from './components/AppNavBar';


import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import AddWorkout from './pages/AddWorkout';
import Logout from './pages/Logout'


import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import {useState, useEffect} from 'react';



function App() {
  const [user, setUser] = useState({
      id: null,
      isAdmin: null
    })

  function unsetUser(){
      localStorage.clear();
    }

  useEffect(()=> {
      
      if(localStorage.getItem('token')){
          fetch('https://fitnessapp-api-ln8u.onrender.com/users/details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {

              if(data.user._id === undefined){
                setUser({
                  id:null,
                })
              }else{
                setUser({
                  id: data.user._id
                })
              }
          })

      }else{
        setUser({
          id: null

        })
        
      }

    }, [])

  return (
      <>
        <UserProvider value = {{user, setUser, unsetUser}}>
          <Router>
            <AppNavBar/>
            <Container>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/workouts" element={<Workouts/>} />
                  <Route path="/addWorkout" element={<AddWorkout/>} />
                  <Route path="/logout" element={<Logout/>} />
              </Routes>
            </Container>
          </Router>
        </UserProvider>
      </>
    )
}

export default App;
