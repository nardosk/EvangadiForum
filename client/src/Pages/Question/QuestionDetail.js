import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "font-awesome/css/font-awesome.min.css";
import "../Question/question.css";

function QuestionDetail({ question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(question);
    // alert(question?.question_id + " clicked");
    navigate(`/answer/${question.question_id}`);
    // <Answer question={question} />;
  };

  return (
    <div className="header_question">
      <div className="question_user">
        <CgProfile style={{ width: "80%", height: "80%" }} />
        <div style={{ alignContent: "center" }}>
          {question ? "User " + question.user_id + "" : "New User"}{" "}
        </div>
      </div>
      <div className="question_title" onClick={handleClick}>
        <div style={{ width: "95%" }}>
          {question ? question.title : "New Title"}
        </div>
        <i
          style={{ width: "5%" }}
          className="question_arrow fa-angle-right"
          aria-hidden="true"
        ></i>
      </div>
    </div>
  );
}

export default QuestionDetail;
