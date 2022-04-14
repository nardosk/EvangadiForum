import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "font-awesome/css/font-awesome.min.css";
import "../Question/question.css";

function QuestionDetail({ question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/answer/${question.question_id}`);
  };
  useEffect(() => {
    console.log(question);
  }, []);
  return (
    <div className="header_question">
      <div className="question_user">
        <CgProfile style={{ width: "80%", height: "80%" }} />
        <div style={{ alignContent: "center" }}>
          {question ? question.user_name + "" : "New User"}{" "}
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
