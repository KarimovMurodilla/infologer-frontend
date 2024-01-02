import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Tasks from "../pages/Tasks";
import Knows from "../pages/Knows";
import You from "../pages/You";

import Login from "../auth/Login";
import PrivateRoute from "../auth/PrivateRoute";
import Signup from "../auth/SignUp";


const Header = () => {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom d-lg-none">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="nav-icon">
                                <Link to="/">
                                    <i className="fa fa-house fa-2x" title="Home"></i>
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/search">
                                    <i className="fa fa-magnifying-glass fa-2x" title="Search"></i>
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/tasks">
                                    <i className="fa fa-diagram-next fa-2x" title="Tasks"></i>
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/knows">
                                    <i className="fa fa-lightbulb fa-2x" title="Knows"></i>
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/you">
                                    <i className="fa fa-circle-user fa-2x" title="You"></i>
                                </Link>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Todogram</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/knows">Knows</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/you">You</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/tasks" element={<Tasks />} />
                <Route exact path="/knows" element={<Knows />} />
                <Route exact path="/you" element={<You />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
}


export default Header;