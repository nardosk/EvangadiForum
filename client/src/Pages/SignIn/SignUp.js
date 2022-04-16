import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import { UserContext } from "../../context/UserContext";

const SignUp = ({ changeForm }) => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const axios = Axios();

  //importing global state from context
  const [userData, setUserData] = useContext(UserContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending data to be registered in database
      await axios.post("/api/users", form);

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post("/api/users/login", {
        email: form.email,
        password: form.password,
      });

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        config: {
          headers: { "x-auth-token": loginRes.data.token },
        },
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (err) {
      console.log("Error : " + err.response.data.msg);
      alert("Error : " + err.response.data.msg);
    }
  };

  return (
    <div className="authfy-panel panel-signup text-center active">
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <div className="authfy-heading">
            <h3 className="auth-title">Join the network</h3>
            <p>
              Already have an account?
              <a className="lnk-toggler" data-panel=".panel-login" href="/">
                Sign in
              </a>
            </p>
          </div>
          <div className="ajax-return"></div>
          <form
            name="signupForm"
            className="signupForm"
            href="/"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="row">
              <div className="col-lg-6 no-padding">
                <div className="form-group wrap-input">
                  <input
                    type="email"
                    className="form-control eva_email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <span className="focus-input"></span>
                </div>
              </div>
              <div className="col-lg-6 no-padding">
                <div className="form-group wrap-input">
                  <input
                    type="text"
                    className="form-control eva_lastname"
                    name="userName"
                    placeholder="User Name"
                    onChange={handleChange}
                  />
                  <span className="focus-input"></span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 no-padding">
                <div className="form-group wrap-input">
                  <input
                    type="text"
                    className="form-control eva_firstname"
                    name="firstName"
                    placeholder="First name"
                    onChange={handleChange}
                  />
                  <span className="focus-input"></span>
                </div>
              </div>
              <div className="col-lg-6 no-padding">
                <div className="form-group wrap-input">
                  <input
                    type="text"
                    className="form-control eva_lastname"
                    name="lastName"
                    placeholder="Last name"
                    onChange={handleChange}
                  />
                  <span className="focus-input"></span>
                </div>
              </div>
            </div>
            <div className="form-group wrap-input">
              <div className="pwdMask">
                <input
                  type="password"
                  className="form-control eva_password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span className="focus-input"></span>
                <span className="fa fa-eye-slash pwd-toggle"></span>
              </div>
            </div>
            <div className="form-group">
              <p className="term-policy text-muted small">
                I agree to the
                <a href="/legal/privacy/" target="_blank">
                  privacy policy
                </a>
                and
                <a href="/legal/terms/" target="_blank">
                  terms of service
                </a>
                .
              </p>
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Agree and Join
              </button>
            </div>
          </form>
          <a className="lnk-toggler" data-panel=".panel-login" href="/">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
