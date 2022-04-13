import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "font-awesome/css/font-awesome.min.css";

function AnswerDetail({ answer }) {
  const navigate = useNavigate();

  return (
    <div className="header_question">
      <div className="question_user">
        <CgProfile style={{ width: "80%", height: "80%" }} />
        <div style={{ alignContent: "center" }}>
          {answer ? "User " + answer.user_id + "" : "New User"}{" "}
        </div>
      </div>
      <div className="question_title">
        <div style={{ width: "95%" }}>
          {answer ? answer.answer : "New Title"}
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

export default AnswerDetail;
