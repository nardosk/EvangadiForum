import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Axios from "../../Axios";
import AnswerDetail from "./AnswerDetail";
import "./Answer.css";

function Answer() {
  const { id } = useParams();

  const [question, setQuestion] = useState(useParams());
  const [userData, setUserData] = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const axios = Axios();

  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const postRes = await axios.post(
        "/api/answer/newanswer",
        {
          answer: form.new_answer,
          question_id: id,
        },
        userData.config
      );
      setAnswers((answers) => [
        ...answers,
        {
          answer: form.new_answer,
          time: new Date(),
          user_id: question.user_id,
          user_name: userData.user.display_name,
          answer_id: postRes.data.insertId,
        },
      ]);
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    loadQuestion();
    loadAnswers();
  }, [userData.user]);

  async function loadQuestion() {
    const response = await axios.get(
      `/api/question/getquestionbyid?question_id=${id}`,
      userData.config
    );
    console.log(response.data?.data);
    setQuestion(response.data?.data);
  }

  async function loadAnswers() {
    const response = await axios.get(
      `/api/answer/getanswer?question_id=${id}`,
      userData.config
    );
    setAnswers(response.data?.data);
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
        <div></div>
        <div style={{ width: "100%", display: "inline-block" }}>
          <div style={{ textAlign: "center" }}>
            <h2 style={{ paddingTop: "100px" }}>Answer The Top Question</h2>
            <Link style={{ textAlign: "center", width: "100%" }} to="/">
              Go to Question Page
            </Link>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div style={{ width: "90%" }}>
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
                  onChange={handleChange}
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
