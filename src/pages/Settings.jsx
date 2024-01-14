import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { FiShield } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

import api from "../auth/Api";
import useAuth from "../auth/useAuth";


const UserSettings = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [profileError, setProfileError] = useState("");
    const [loading, setLoading] = useState(false);
    const [btnClicked, setBtnClicked] = useState(false);
    const [currentUser, setCurUser] = useState("")
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        about: ''
    });
    const navigate = useNavigate();
    const btnStatus = !(userData.first_name.length > 0 && userData.first_name.length <= 25) || !(userData.last_name.length > 0 && userData.last_name.length <= 25);

    const { logout } = useAuth();

    useEffect(() => {
        resetData();
    }, []);

    const resetData = () => {
        api.get('/users/me')
            .then((response) => {
                setUserData({
                    ...userData,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    username: response.data.username,
                    about: response.data.about,
                });
                setCurUser(response.data);
                localStorage.setItem("activeUser", JSON.stringify(response.data))
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        localStorage.clear();
                        navigate("/auth/login");
                    }
                }

            });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleProfileInfo = async () => {
        setLoading(true);
        const result = await validateUsername(userData.username);

        const headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (result) {
            try {
                const resp = await api.patch('/fastapi_users/me',
                    userData,
                    { headers }
                )
                console.log(resp);
                resetData();
                setBtnClicked(true);
            } catch (error) {
                console.log(error);
                setBtnClicked(false);
            } finally {
                setLoading(false);
            }
        }
    }

    const validateUsername = async (username) => {
        const regex_username = /^[a-zA-Z][a-zA-Z0-9_]{0,35}$/; //'Usernames can\'t start with a number.'

        if (regex_username.test(username)) {
            const resp = await api.get('/users/check_username', {
                params: { username },
                headers: { 'Accept': 'application/json' }
            })

            if (resp.data.detail && currentUser.username !== username) {
                setProfileError("This username is already taken.");
            } else {
                setProfileError(null);
                return true;
            }

        } else {
            setProfileError("Invalid username. Please use only letters, numbers, and underscores, with a minimum length of 4 characters.");
        }
    }

    const handleClose = () => {
        setBtnClicked(false);
    }

    return (
        <div className="container mt-3 mb-5">
            <nav aria-label="breadcrumb" className="main-breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Profile Settings</li>
                </ol>
            </nav>
            <div className="row gutters-sm">
                <div className="col-md-4 d-none d-md-block">
                    <div className="card">
                        <div className="card-body">
                            <nav className="nav flex-column nav-pills nav-gap-y-1">
                                <a
                                    type="button"
                                    className={`nav-item nav-link ${activeTab === "profile" ? "active" : ""}`}
                                    onClick={() => handleTabChange("profile")}
                                >
                                    <FiUser className="fs-4" />
                                    <p className="d-inline ms-1">Profile Information</p>
                                </a>
                                <a
                                    type="button"
                                    className={`nav-item nav-link ${activeTab === "account" ? "active" : ""}`}
                                    onClick={() => handleTabChange("account")}
                                >
                                    <FiSettings className="fs-4" />
                                    <p className="d-inline ms-1">Account Settings</p>
                                </a>
                                <a
                                    type="button"
                                    className={`nav-item nav-link ${activeTab === "security" ? "active" : ""}`}
                                    onClick={() => handleTabChange("security")}
                                >
                                    <FiShield className="fs-4" />
                                    <p className="d-inline ms-1">Security</p>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header border-bottom mb-3 d-flex d-md-none">
                            <ul className="nav nav-tabs card-header-tabs nav-gap-x-1" role="tablist">
                                <li className="nav-item">
                                    <a
                                        type="button"
                                        className={`nav-link has-icon ${activeTab === "profile" ? "active" : ""}`}
                                        onClick={() => handleTabChange("profile")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        type="button"
                                        className={`nav-link has-icon ${activeTab === "account" ? "active" : ""}`}
                                        onClick={() => handleTabChange("account")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        type="button"
                                        className={`nav-link has-icon ${activeTab === "security" ? "active" : ""}`}
                                        onClick={() => handleTabChange("security")}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>


                        <div className="card-body tab-content">
                            {activeTab === "profile" && (
                                <div className="tab-pane active" id="profile">
                                    {   
                                        btnClicked && !profileError && activeTab === "profile" ?
                                        (<div class="alert alert-success alert-dismissible" role="alert">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel"><IoIosCheckmarkCircle className="fs-3 text-success" /> Your changes is saved</h1>
                                            <button type="button" class="btn-close" onClick={handleClose}></button>
                                        </div>)
                                        : ""
                                    }                                    
                                    <h6>YOUR PROFILE INFORMATION</h6>
                                    <hr />
                                    <form>
                                        <div className="form-group mb-3">
                                            <label htmlFor="firstName">First Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstName"
                                                placeholder="Enter your first name"
                                                value={userData.first_name}
                                                onChange={(e) => setUserData({ ...userData, ['first_name']: e.target.value })}
                                            />
                                            <div className="text-danger">
                                                {
                                                    userData.first_name.length > 25 ? 'First name can\'t exceed 25 characters.' : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="lastName"
                                                placeholder="Enter your last name"
                                                value={userData.last_name}
                                                onChange={(e) => setUserData({ ...userData, ['last_name']: e.target.value })}
                                            />
                                            <div className="text-danger">
                                                {
                                                    userData.last_name.length > 25 ? 'Last name can\'t exceed 25 characters.' : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="username">Username</label>
                                            <div className="input-group flex-nowrap mb-1">
                                                <span className="input-group-text" id="addon-wrapping">@</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="username" placeholder="Username"
                                                    value={userData.username}
                                                    onInput={(e) => setUserData({ ...userData, ['username']: e.target.value })}
                                                />
                                            </div>
                                            <div className="text-danger">
                                                {
                                                    profileError ? profileError : ''
                                                }
                                            </div>
                                            <small id="fullNameHelp" className="form-text text-muted">
                                                1. Length: Should be between 4 and 35 characters. <br />
                                                2. Start Character: Must start with a letter. <br />
                                                3. Allowed Characters: Can only contain letters (both uppercase and lowercase), numbers, and underscores.
                                            </small>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="bio">Your Bio</label>
                                            <textarea
                                                className="form-control autosize"
                                                id="bio"
                                                value={userData.about}
                                                placeholder="Write something about you"
                                                style={{ overflow: 'hidden', 'overflowWrap': 'break-word', resize: 'none', height: 62 + 'px' }}
                                                onChange={(e) => setUserData({ ...userData, ['about']: e.target.value })}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary me-1"
                                            onClick={handleProfileInfo}
                                            disabled={btnStatus}
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            type="reset"
                                            className="btn btn-outline-secondary"
                                            onClick={resetData}
                                        >
                                            Reset Changes
                                        </button>
                                    </form>
                                </div>
                            )}
                            {activeTab === "account" && (
                                <div>
                                    <h6>ACCOUNT SETTINGS</h6>
                                    <hr />
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="username">Email</label>
                                            <input type="text" className="form-control" id="username" aria-describedby="usernameHelp" value={currentUser.email} disabled />
                                            <small id="usernameHelp" className="form-text text-muted">Your current email authentication.</small>
                                        </div>
                                        <hr />
                                        <div className="form-group">
                                            <label className="d-block text-danger">Logout</label>
                                            <p className="text-muted font-size-sm">Logout from this account.</p>
                                        </div>
                                        <button className="btn btn-danger" type="button" onClick={logout}>Logout</button>
                                    </form>
                                </div>
                            )}
                            {activeTab === "security" && (
                                <div>
                                    <h6>SECURITY SETTINGS</h6>
                                    <hr />
                                    <form>
                                        <div className="form-group">
                                            <label className="d-block">Change Password</label>
                                            <input type="text" className="form-control" placeholder="Enter your old password" />
                                            <input type="text" className="form-control mt-1" placeholder="New password" />
                                            <input type="text" className="form-control mt-1" placeholder="Confirm new password" />
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-primary me-1"
                                            onClick={handleProfileInfo}
                                            disabled={btnStatus}
                                        >
                                            Save Changes
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserSettings;