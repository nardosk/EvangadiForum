import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Source/img/evangadi-logo-home.png";
// import "./Footer.css";

function FooterMain() {
  return (
    <footer className="footer">
      <div className="footer-warpper">
        <div className="footer-top">
          <div className="container">
            <div className="footer-bottom-content clearfix">
              <div className="row">
                <div className="col-lg-4 col-md-4">
                  <div className="logo-footer">
                    <a className="navbar-brand" href="/">
                      <img src={Logo} alt="" />
                    </a>
                  </div>

                  <ul className="footer-social-list list-social list-inline">
                    <li>
                      <Link to="https://www.facebook.com/EthiopiansNetwork">
                        <i className="social_facebook "></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.instagram.com/evangaditech/">
                        <i className="social_instagram "></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="https://www.youtube.com/c/weareethiopians">
                        <i className="social_youtube "></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h5>Useful Link</h5>
                  <ul className="list-menu">
                    <li>
                      <a href="/explained">How it works </a>
                    </li>
                    <li>
                      <a href="/legal/terms/">Terms of Service</a>
                    </li>
                    <li>
                      <a href="/legal/privacy/">Privacy policy</a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4 col-md-4">
                  <h5>Contact Info</h5>
                  <ul className="list-menu contact-list">
                    <li>Evangadi Networks</li>
                    <li>
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="8bf8fefbfbe4f9ffcbeefdeae5eceaefe2a5e8e4e6"
                      >
                        [email&#160;protected]
                      </a>
                    </li>
                    <li>+1-202-386-2702</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterMain;
