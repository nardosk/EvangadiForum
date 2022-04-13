import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { UserContext } from './context/UserContext';
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';
import Footer from './Pages/Footer/Footer';
import Login from './Pages/Login/Login';
import Question from './Pages/Question/Question';
import Answer from './Pages/Answer/Answer';
import SignUp from './Pages/SignUp/SignUp';
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const checkLoggedIn = async () => {

    //check if token already exists in localStorage
    let token = localStorage.getItem('auth-token');
    if (token === null) {

      //token not in localStorage then set auth token empty
      localStorage.setItem('auth-token', '');
      token = '';
    } else {

      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get('http://localhost:3001/api/users', {
        headers: { 'x-auth-token': token }
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name
        }
      })
    }
  }

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });
    console.log(isLoggedIn);
    //resetting localStorage 
    localStorage.setItem('auth-token', '');
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (userData.user)
      setLoggedIn(true);
    else
      setLoggedIn(false);
  }, [userData.user]);
  return (

    <Router>
      <Header logout={logout} isLoggedIn={isLoggedIn} />
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/answer" element={<Answer />} />


          {/* passing logout function as props to Home page */}
          <Route path="/" element={<Home logout={logout} />} />
        </Routes>
      </div>
      <Footer />
    </Router>

  );
}

export default App;
