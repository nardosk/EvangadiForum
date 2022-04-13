import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import HomeQuestion from './HomeQuestion'
import axios from 'axios';

const Home = ({ logout }) => {
    const [userData, setUserData] = useContext(UserContext);
    const [questions, setQuestions] = useState([{
        question: null,
        question_id: null,
        time: null,
        title: null,
        user_id: null,
    }]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData.user) navigate("/login");
        // loadQuestions();
    }, [userData.user, navigate]);

    useEffect(() => {
        loadQuestions();
    }, [userData.token]);

    async function loadQuestions() {
        const response = await axios.get('http://localhost:3001/api/question/getquestions', {
            headers: { 'x-auth-token': userData?.token }
        })
        console.log(response.data.data);
        setQuestions(response.data.data);
        console.log(questions);
    }

    return (
        <div>
            <section className="container">
                <div className="header_row">
                    <button className="blue_button">
                        Ask Question
                    </button>
                    <h2 className="header_border">Welcome: {userData.user?.display_name}</h2>
                </div>
                <h1 >Questions</h1>
                {questions?.map((value, index) => {
                    <HomeQuestion question={value} key={index} />
                })};
            </section>
        </div>

    )
}

export default Home