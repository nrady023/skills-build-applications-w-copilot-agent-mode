import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5 mb-5">
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">🏋️ Welcome to OctoFit Tracker</h2>
                  </div>
                  <div className="card-body">
                    <p className="lead">
                      A comprehensive fitness tracking application for individuals and teams.
                    </p>
                    <hr />
                    <div className="row mt-4">
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">👥 Users</h5>
                            <p className="card-text">Manage user profiles and account information.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">👫 Teams</h5>
                            <p className="card-text">Create and manage fitness teams.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">📊 Activities</h5>
                            <p className="card-text">Log and track your fitness activities.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">🏆 Leaderboard</h5>
                            <p className="card-text">Compete with others and climb the ranks.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">💪 Workouts</h5>
                            <p className="card-text">Plan and execute personalized workouts.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-3">
                        <div className="card border-0 shadow-sm text-center">
                          <div className="card-body">
                            <h5 className="card-title">✨ Features</h5>
                            <p className="card-text">Advanced analytics and recommendations.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <p className="text-muted text-center mt-4">
                      Use the navigation menu above to explore all features.
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
