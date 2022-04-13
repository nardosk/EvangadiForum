import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import QuestionDetail from "../Question/QuestionDetail";
import axios from "axios";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate("/login");
    else loadQuestions();
  }, [userData.user, navigate]);

  async function loadQuestions() {
    const response = await axios.get(
      "http://localhost:3001/api/question/getquestions",
      {
        headers: { "x-auth-token": userData.token },
      }
    );
    console.log(response.data.data);
    setQuestions(response.data?.data);
    console.log(response.data.data);
    console.log(questions);
  }

  const handleClick = () => {
    navigate("/newquestion");
  };

  return (
    <section className="container">
      <div className="header_row">
        <button className="blue_button" onClick={handleClick}>
          Ask Question
        </button>
        <h2 className="header_border">
          Welcome: {userData.user?.display_name}
        </h2>
      </div>
      <h1>Questions</h1>
      {questions?.map((value, index) => {
        return <QuestionDetail question={value} key={index} />;
      })}
    </section>
  );
};

export default Home;
