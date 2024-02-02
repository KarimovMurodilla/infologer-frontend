import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { GoTasklist } from "react-icons/go";
import { MdLightbulbOutline, MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

import getMe from "../auth/GetMe";


const Header = () => {
    const [me, setUserData] = useState(getMe());
    const location = useLocation();

    useEffect(() => {
        setUserData(getMe());
    }, [location]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom d-lg-none">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className={`nav-icon ${location.pathname === '/' && 'nav-border-top'}`}>
                                <Link to="/">
                                    <AiOutlineHome className="fs-2" />
                                </Link>
                            </div>
                            <div className={`nav-icon ${location.pathname === '/search' && 'nav-border-top'}`}>
                                <Link to="/search">
                                    <AiOutlineSearch className="fs-2" />
                                </Link>
                            </div>
                            <div className={`nav-icon ${location.pathname === '/tasks' && 'nav-border-top'}`}>
                                <Link to="/tasks">
                                    <GoTasklist className="fs-2" />
                                </Link>
                            </div>
                            <div className={`nav-icon ${location.pathname === '/knows' && 'nav-border-top'}`}>
                                <Link to="/knows">
                                    <MdLightbulbOutline className="fs-2" />
                                </Link>
                            </div>
                            <div className={`nav-icon ${location.pathname === `/${me && me.username}` && 'nav-border-top'}`}>
                                <Link to={`/${me && me.username}`}>
                                    <MdOutlineAccountCircle className="fs-2" />
                                </Link>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Todogram
                        <button className="badge btn btn-outline-primary text-wrap ms-1" disabled>
                            Beta
                        </button>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' && 'active'}`} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/search' && 'active'}`} to="/search">Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/tasks' && 'active'}`} to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/knows' && 'active'}`} to="/knows">Knows</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === `/${me && me.username}` && 'active'}`} to={`/${me && me.username}`}>You</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header;