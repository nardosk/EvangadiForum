import React from 'react'
import { CgProfile } from 'react-icons/cg';
import "../Question/question.css"

function HomeQuestion({ question }) {
 return (
  <div className="header_question">
   <div className="question_user">
    <CgProfile style={{ width: '80%', height: '100px' }} />
    <div>question.user_Id</div>
   </div>
   <div className="question_title" onClick="handleClick">
    <div>question.title</div>
    <div className="question_arrow">Arrow</div>
   </div>
  </div>
 )
}

export default HomeQuestion