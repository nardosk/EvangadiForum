import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const SignUp = () => {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    //importing global state from context
    const [userData, setUserData] = useContext(UserContext);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //sending data to be registered in database
            await axios.post('http://localhost:3001/api/users', form);

            //once registered the login automatically so send the new user info to be logged in
            const loginRes = await axios.post('http://localhost:3001/api/users/login', {
                email: form.email,
                password: form.password
            });

            // set the global state with the new user info
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });

            //set localStorage with the token
            localStorage.setItem('auth-token', loginRes.data.token);

            //navigate to homepage once the user is signed up
            navigate("/");
        } catch (error) {
            console.log('problem ==>', error.response.data.msg);
        }
    }
    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name: </label>
                <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                /><br />
                <label>Last Name: </label>
                <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                /><br />
                <label>User Name: </label>
                <input
                    type="text"
                    name="userName"
                    onChange={handleChange}
                /><br />
                <label>Email: </label>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                /><br />
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                /><br />
                <button>submit</button>
            </form>
            <Link to="/login">Already have an account?</Link>
        </div>
    );
};

export default SignUp;
