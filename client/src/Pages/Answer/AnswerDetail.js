import React from "react";
import { CgProfile } from "react-icons/cg";

function AnswerDetail({ answer }) {
  return (
    <div className="header_question">
      <div className="question_user">
        <CgProfile style={{ width: "80%", height: "80%" }} />
        <div style={{ alignContent: "center" }}>
          {answer ? answer.user_name + "" : "New User"}{" "}
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
