import { Link } from "react-router-dom";

import { GoTasklist } from "react-icons/go";
import { MdLightbulbOutline, MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";

import getMe from "../auth/GetMe";


const Header = () => {
    const me = getMe();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom d-lg-none">
                <div className="container-fluid">
                    <ul className="navbar-nav w-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="nav-icon nav-border-top">
                                <Link to="/">
                                    <AiOutlineHome className="fs-2" />
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/search">
                                    <AiOutlineSearch className="fs-2" />
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/tasks">
                                    <GoTasklist className="fs-2" />
                                </Link>
                            </div>
                            <div className="nav-icon">
                                <Link to="/knows">
                                    <MdLightbulbOutline className="fs-2" />
                                </Link>
                            </div>
                            <div className="nav-icon">
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
                                <Link className="nav-link" to={`/${me && me.username}`}>You</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header;