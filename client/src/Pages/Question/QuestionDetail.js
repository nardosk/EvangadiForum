import React from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "font-awesome/css/font-awesome.min.css";
import "../Question/question.css";
import { FaGreaterThan } from "react-icons/fa";

function QuestionDetail({ question }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/answer/${question.question_id}`);
  };
  return (
    <div className="header_question">
      <div className="question_user" style={{ textAlign: "center" }}>
        <CgProfile style={{ width: "80%", height: "80%", margin: "auto" }} />
        <div style={{ width: "80%", height: "20%", margin: "auto" }}>
          {question ? question.user_name + "" : "New User"}{" "}
        </div>
      </div>
      <div className="question_title" onClick={handleClick}>
        <div className="question_content">
          {question ? question.title : "New Title"}
        </div>
        <div className="question_arrow">
          <FaGreaterThan />
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
