import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div>
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
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header;