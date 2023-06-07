import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom';
import myLogo from './Logo.png';
import './styles/App.scss';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import MovieList from './components/MovieList';
import './styles/MovieList.scss';

const HomePage = () => (
  <>
    <MovieList />
  </>
);
const LoginPage = () => <h1>Login Page</h1>;
const MovieDetailsPage = () => <h1>Movie Details Page</h1>;
const ProfilePage = () => <h1>Profile Page</h1>;
const StreamingServicesPage = () => <h1>Streaming Services Page</h1>;
const UsersPage = () => <h1>Users Page</h1>;

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <a href="/">
              <img src={myLogo} className="App-logo" alt="logo" />
            </a>

            <ul>
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/movies/123">
                  Movie Details
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/streaming">
                  Streaming Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/users">
                  Users
                </NavLink>
              </li>
            </ul>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/streaming" element={<StreamingServicesPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;


