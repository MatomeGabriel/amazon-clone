import React from "react";
import "./SignIn.css";
import Form from "../components/Form";
import { Link } from "react-router";
const SignIn = () => {
  return (
    <div className="sign-in">
      <div className="sign-in-container">
        <Form isRegister={false} />
        <div className="no-account">
          <p className="text-md mb-12">
            No Account with us, Setup a new Account Quickly
          </p>
          <Link to="/register" className="btn btn-outline btn-width-auto">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
