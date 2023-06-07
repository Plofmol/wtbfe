import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <h1>Login</h1>
      <div className="form-container">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button className="login-button">Login</button>
      </div>
      <p>
        Don't have an account yet?{" "}
        <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default ProfilePage;
