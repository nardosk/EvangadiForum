import Axios from "./Axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./Pages/Answer/Answer.css";
import { UserContext } from "./context/UserContext";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Header/Header";
import Footer from "./Pages/Footer/Footer";
// import Footer from "./Pages/Footer/FooterMain";
import Login from "./Pages/SignIn/SignIn";
import NewQuestion from "./Pages/Question/NewQuestion";
import Answer from "./Pages/Answer/Answer";
import NotFound from "./Pages/NotFound/NotFound";
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const axios = Axios();

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null || token === "") {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get("/api/users", {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
        config: {
          headers: { "x-auth-token": token },
        },
      });
    }
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/newquestion" element={<NewQuestion />} />
          <Route path="/answer/:id" element={<Answer />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
