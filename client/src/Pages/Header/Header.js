import React, { useContext, useEffect } from 'react'
import "./Header.css"
import Logo from "../../Source/img/evangadi-logo-home.png"
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const Header = ({ logout, isLoggedIn }) => {
 const [userData, setUserData] = useContext(UserContext);
 const navigate = useNavigate();
 useEffect(() => {
  if (!userData.user) navigate("/login");
 }, [userData.user, navigate]);

 const logoutUser = () => {
  //set global state to undefined will logout the user
  setUserData({
   token: undefined,
   user: undefined,
  });

  //resetting localStorage 
  localStorage.setItem('auth-token', '');
 };
 return (
  <header className="navbar-header">
   <nav className="navbar navbar-expand-lg fixed-top">
    <div className="container">
     <a className="navbar-brand" href="/"> <img src={Logo} alt="Evangadi logo" /></a>
     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon  icon_menu"></span>
     </button>


     <div className="collapse navbar-collapse bg-orange" id="navbarCollapse">
      <ul className="navbar-nav ml-auto">
       <li className="nav-item active">
        <a data-scroll="" className="nav-link section-scroll" href="/">Home</a>
       </li>
       <li className="nav-item">
        <a data-scroll="" className="nav-link section-scroll" href="/explained">How it works</a>
       </li>
       <li>
        <div className="connect-block">
         {/* logout when the button clicked in which the function comes from app.js */}
         <button className="lnk-toggler btn btn-blue" data-panel=".panel-login" href="#" onClick={logout}>{isLoggedIn ? `Log Out` : `Sign In`}</button>
         {/* <a className="lnk-toggler btn btn-blue" data-panel=".panel-login" href="#">
           {!logout &&  {Sign in}</a> */}
        </div>
       </li>
      </ul>
     </div>
    </div>
   </nav>
  </header>
 )
}

export default Header