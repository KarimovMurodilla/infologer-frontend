import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";

import api from "../auth/Api";
import getMe from "../auth/GetMe";
import TasksPage from "./Tasks";
import KnowsPage from "./Knows";

const You = () => {
    const [user, setUser] = useState("");
    const { username } = useParams();
    const [activeTab, setActiveTab] = useState("knows");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const getUserData = async () => {
        if (username === 'you') {
            const userData = await getMe();
            setUser(userData);
            setIsLoading(false);

        } else {
            try {
                const params = {
                    username: username,
                };
                const headers = {
                    'accept': 'application/json'
                }
                const response = await api.get('/users/get_by_username', { params, headers });
                const userData = response.data.detail;
                setUser(userData);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.clear();
                    navigate('/auth/login');
                }
            } finally {
                setIsLoading(false);
            }
        }
    }

    useEffect(() => {
        getUserData();
    }, [username]);

    return (
        <div className="container mt-4 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-between">
                    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
                        <h4>{user.first_name}</h4>
                        <h4>{user.last_name}</h4>
                        <hr />
                        <p>@{user.username}</p>
                    </div>

                    <div>
                        <h6>About:</h6>
                        <div className="badge bg-secondary text-wrap" style={{ width: 12 + 'rem' }}>
                            {user.about}
                        </div>
                    </div>

                    <div>
                        {
                            username === 'you' &&
                            <Link to="/settings" type="button" className="btn">
                                <IoMdSettings className="fs-2" />
                            </Link>
                        }
                    </div>
                </div>

                <hr />

                <div className="row justify-content-center">
                    <div className="row justify-content-center">
                        <ul className="col-md-8 nav nav-underline text-center" id="UserTabs">
                            <li className="nav-item">
                                <a
                                    className={`nav-link text-dark ${activeTab === "knows" ? "active" : ""}`}
                                    onClick={(e) => setActiveTab("knows")}
                                >
                                    Knows
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link text-dark ${activeTab === "tasks" ? "active" : ""}`}
                                    onClick={(e) => setActiveTab("tasks")}
                                >
                                    Completed Tasks
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content mt-5">
                            <div className={`tab-pane fade ${activeTab === "knows" ? "show active" : ""}`}>
                                {
                                    (!isLoading && username !== 'you') ? <KnowsPage showCompleted={true} userId={user.id} />
                                        : <KnowsPage showCompleted={true} />
                                }
                            </div>
                            <div className={`tab-pane fade ${activeTab === "tasks" ? "show active" : ""}`}>
                                {
                                    (!isLoading && username !== 'you') ? <TasksPage showCompleted={true} userId={user.id} />
                                        : <TasksPage showCompleted={true} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}


export default You;