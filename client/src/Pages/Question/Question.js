import React from "react";
import "./question.css";
const Question = () => {
  return (
    <section className="container">
      <div className="header_row">
        <button className="blue_button">Ask Question</button>
        <h2 className="header_border">welcome:</h2>
      </div>
      <h1 className="header_question">Questions</h1>
      <div className="question_list">
        <div>
          <div className="question_user">pic</div>
          <spam>name</spam>
        </div>
        <div onClick="handleClick">
          <div className="question_title">java</div>
          <div className="question_arrow">arr</div>
        </div>
      </div>
    </section>
  );
};

export default Question;
