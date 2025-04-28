import React, { useContext, useState } from "react";
import { Link } from "react-router";

import "./Form.css";
import { login, register } from "../authService";
import ShoppingContext from "../context/ShoppingContext";

const Form = ({ isRegister = false }) => {
  const { setLinkTo, linkTo, navigate } = useContext(ShoppingContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSetName = (e) => {
    setName(() => e.target.value);
  };
  const handleSetEmail = (e) => {
    setEmail(() => e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(() => e.target.value);
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      alert("Registration successful! 🎉");
    } catch (error) {
      setError(error.message);
      alert("Failed to register ⛔" + error);
      console.error(error);
    } finally {
      if (linkTo) {
        navigate(linkTo);
        setLinkTo(null);
      } else {
        navigate("/");
      }
    }
  };

  const handleOnSignIn = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Sign-in successful! 🎉");
    } catch (error) {
      setError(error.message);
      alert("Failed to Sign-in ⛔" + error);
      console.error(error);
    } finally {
      if (linkTo) {
        navigate(linkTo);
        setLinkTo(null);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <form
      className="form"
      onSubmit={isRegister ? handleOnRegister : handleOnSignIn}>
      <h2 className="form-title">
        {isRegister ? "Create Account" : "Sign in"}
      </h2>
      <div className="form-group">
        {isRegister && (
          <>
            <div className="input-group">
              <label htmlFor="">Your name</label>
              <input
                value={name}
                onChange={handleSetName}
                placeholder="First and last name"
                type="text"
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label htmlFor="email">Your email</label>
          <input
            value={email}
            onChange={handleSetEmail}
            placeholder="your email"
            type="email"
            id="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Your password</label>
          <input
            value={password}
            onChange={handleSetPassword}
            placeholder="Your password"
            type="password"
            id="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
          />
          {isRegister && (
            <>
              <div className="alert">
                <span className="material-symbols-outlined alert-icon">
                  exclamation
                </span>
                <span className="alert-label">
                  Passwords must be at least 6 characters.{" "}
                </span>
              </div>
            </>
          )}
        </div>

        {isRegister && (
          <>
            <div className="input-group">
              {/* <label htmlFor="re-enter-password">Re-enter password</label>
              <input
                placeholder="Your password"
                type="password"
                autoComplete={isRegister ? "new-password" : "current-password"}
                required
                id="re-enter-password"
              /> */}
              <button className="btn btn-primary btn-sign-up mt-12">
                Continue
              </button>
            </div>
            <div className="terms">
              <p className="terms-text">
                By creating an account, you agree to Amazon's
                <Link> Conditions of Use & Sale</Link>. Please see our
                <Link> Privacy Notice</Link>, our <Link> Cookies Notice</Link>{" "}
                and our <Link> Interest-Based Ads Notice</Link>.
              </p>
            </div>
            <div className="has-account">
              <span className="has-account-label">
                Already have an account?
              </span>
              <Link to="/login" className="has-account-link">
                Sign in{" "}
              </Link>
            </div>
          </>
        )}
        {!isRegister && (
          <button className="btn btn-primary btn-sign-up">Sign in</button>
        )}
      </div>
    </form>
  );
};

export default Form;
