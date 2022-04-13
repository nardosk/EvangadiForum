import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import AnswerDetail from "./AnswerDetail";
import "./Answer.css";

function Answer() {
  const { id } = useParams();

  const [question, setQuestion] = useState(useParams());
  const [userData, setUserData] = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestion();
    loadAnswers();
  }, []);

  async function loadQuestion() {
    const response = await axios.get(
      "http://localhost:3001/api/question/getquestions",
      {
        headers: { "x-auth-token": userData.token },
      }
    );
    console.log(response.data.data);
    const quests = response.data?.data;
    if (quests) {
      const currQuest = quests.find(
        (quest) => quest.question_id === parseInt(id)
      );
      setQuestion(currQuest);
    }
  }

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);

  async function loadAnswers() {
    console.log(question);
    const response = await axios.get(
      "http://localhost:3001/api/answer/getanswer?question_id=" + id,
      {
        headers: { "x-auth-token": userData.token },
      }
    );
    console.log(response.data.data);
    setAnswers(response.data?.data);
    console.log(response.data.data);
    console.log(answers);
  }
  return (
    <section className="container">
      <br />
      <br />
      <br />
      <br />
      <div>
        <h3>Questions</h3>
        <h4>{question ? question.title : "New Title"}</h4>
        <h5>{question ? question.question : "New Question"}</h5>
        <h2 className="community_title">Answer From The Community</h2>
        <div>
          {answers?.map((value, index) => {
            return <AnswerDetail answer={value} key={index} />;
          })}
        </div>
        <div style={{ width: "100%", display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ paddingTop: "100px" }}>Answer The Top Question</h2>
            <Link style={{ textAlign: "center", width: "100%" }} to="/">
              Go to Question Page
            </Link>
          </div>
          <form action="/newanswer" method="post">
            <div>
              <div>
                <input
                  style={{
                    textAlignLast: "start",
                    height: "150px",
                    width: "100%",
                  }}
                  type="text"
                  name="new_answer"
                  placeholder="Your Answer . . . "
                />
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <button type="submit">Post Your Answer</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Answer;
