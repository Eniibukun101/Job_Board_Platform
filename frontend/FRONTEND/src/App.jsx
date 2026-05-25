import React from "react";
import "./App.css";

export default function App() {
  return (
    <div className="home">
      <div className="overlay">
        <header className="header">
          <h3>Job seekers login page</h3>
        </header>

        <div className="hero">
          <div className="logo">👜</div>
          <p className="welcome">Welcome to</p>
          <h1 className="title">Jobnest</h1>

          <div className="buttons">
            <button className="btn">Post a new job</button>
            <button className="btn">Browse jobs</button>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="icon">🔍</div>
            <p>Register an account to start</p>
          </div>

          <div className="feature">
            <div className="icon">🔎</div>
            <p>Specify and search your desired jobs</p>
          </div>

          <div className="feature">
            <div className="icon">📄</div>
            <p>Send your resume to employers</p>
          </div>
        </div>
      </div>
    </div>
  );
}