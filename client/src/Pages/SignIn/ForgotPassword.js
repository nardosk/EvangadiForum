import React from "react";

function ForgotPassword({ showSignIn, showSignUp }) {
  return (
    <div className="authfy-panel panel-forgot active">
      <div className="row">
        <div className="col-xs-12 col-sm-12">
          <div className="reset-wrapper">
            <div className="authfy-heading">
              <h3 className="auth-title">Reset your password</h3>
              <p>
                Fill in your e-mail address below and we will send you an email
                with further instructions.
              </p>
            </div>
            <div className="email-not-found"></div>
            <form name="forgetForm" className="forgetForm" method="POST">
              <div className="form-group wrap-input">
                <input
                  type="email"
                  className="form-control"
                  name="emailaddress"
                  placeholder="Email address"
                ></input>
                <span className="focus-input"></span>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Reset your password
                </button>
              </div>
              <div className="form-group">
                <a
                  className="lnk-toggler"
                  data-panel=".panel-login"
                  href="#"
                  onClick={showSignIn}
                >
                  Already have an account?
                </a>
              </div>
              <div className="form-group">
                <a
                  className="lnk-toggler"
                  data-panel=".panel-signup"
                  href="#"
                  onClick={showSignUp}
                >
                  Don’t have an account?
                </a>
              </div>
            </form>
          </div>

          <div className="reset-link-sent">
            <div className="authfy-heading">
              <h3 className="auth-title">
                Reset instruction is sent to your email
              </h3>
              <h4>Please check your email to reset your password.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
