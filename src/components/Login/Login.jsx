import React from "react";

// icon
import { BiEnvelope, BiLock } from "react-icons/bi";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";

const Login = () => {
  return (
    <div class="clonegpt-user-login clonegpt-user-out">
      {/* login text */}
      <h3>Login to your account</h3>

      <form
        onClick={() => {
          chrome.runtime.sendMessage({
            from: "openUserUrl",
            url: "https://kalami.ai/auth",
          });
        }}
      >
        <div className="clonegpt-input-group">
          <p>Email</p>
          <div className="clonegpt-input">
            <BiEnvelope />
            <input type="text" placeholder="Email" />
          </div>
        </div>
        <div className="clonegpt-input-group">
          <p>Password</p>
          <div className="clonegpt-input">
            <BiLock />
            <input type="text" placeholder="Password" />
          </div>
        </div>
        <div className="clonegpt-extra-login">
          <div className="clonegpt-remember-me">
            <input type="checkbox" className="checkbox" />
            <p>Remember Me</p>
          </div>
          <p>Forgot Password</p>
        </div>
        <button className="btn w-full">Login</button>
      </form>

      {/* bottom section */}
      <div className="clonegpt-oauth">
        <div className="clonegpt-oauth-text">
          <span></span>
          <p>Or continue with</p>
          <span></span>
        </div>

        <div
          className="clonegpt-oauth-items-container"
          onClick={() => {
            chrome.runtime.sendMessage({
              from: "openUserUrl",
              url: "https://kalami.ai/auth",
            });
          }}
        >
          <div className="clonegpt-oauth-item">
            <FaGoogle />
          </div>
          <div className="clonegpt-oauth-item">
            <FaFacebookF />
          </div>
          <div className="clonegpt-oauth-item">
            <FaGithub />
          </div>
        </div>

        <p>
          Do not have an account?{" "}
          <span
            onClick={() => {
              chrome.runtime.sendMessage({
                from: "openUserUrl",
                url: "https://kalami.ai/auth/register",
              });
            }}
          >
            Register now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
