import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Axios from "../../Axios";
import "./question.css";
const NewQuestion = () => {
  const [userData] = useContext(UserContext);
  const axios = Axios();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      await axios.post(
        "/api/question/newquestion",
        {
          title: form.title,
          question: form.question,
        },
        userData.config
      );
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log("problem", err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  return (
    <section className="container" style={{ paddingTop: "100px" }}>
      <div className="d-flex flex-column align-items-center my-5">
        <h3>Steps to write a good question</h3>
        <ul style={{ fontSize: "large", alignItems: "baseline" }}>
          <li>Summerize your in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <div className="container" style={{ width: "90%" }}>
        <div
          className="container"
          style={{
            paddingTop: "50px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <h3>Ask a public question</h3>
          <Link to="/">Go to Question Page</Link>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          <div style={{ width: "100%" }}>
            <input
              style={{
                marginTop: "15px",
                height: "60px",
                width: "100%",
                borderRadius: "10px",
                padding: "10px 15px",
              }}
              maxLength="200"
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />
            <div>
              <textarea
                style={{
                  marginTop: "15px",
                  height: "200px",
                  width: "100%",
                  borderRadius: "10px",
                  padding: "10px 15px",
                }}
                maxLength="255"
                type="text"
                name="question"
                placeholder="Question Description..."
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <button
                style={{
                  padding: "10px 25px",
                  borderRadius: "5px",
                }}
                className="btn btn-lg btn-primary"
                type="submit"
              >
                Post Your Question
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewQuestion;
