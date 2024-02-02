import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { IoEyeOffOutline } from "react-icons/io5";

import api from "../auth/Api";
import getMe from "../auth/GetMe";
import TasksPage from "./Tasks";
import KnowsPage from "./Knows";
import { OtherUserKnows, OtherUserTasks } from "../components/OtherUserData";


const You = () => {
    const me = getMe();

    const [user, setUser] = useState("");
    const [activeTab, setActiveTab] = useState("knows");
    const [isLoading, setIsLoading] = useState(true);
    
    const { username } = useParams();
    const navigate = useNavigate();

    const getUserData = async () => {
        
        if (me.username === username) {
            setUser(me);
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
                if (!userData) {
                    navigate('/404')
                }
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
        <div className="container">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-between">
                    <div className="p-3 mb-5 rounded">
                        <p className="text-decoration-underline fs-2">{user.first_name}</p>
                        <p className="text-decoration-underline fs-2">{user.last_name}</p>
                        <hr />
                        <p className="font-monospace fs-3">@{user.username}</p>
                    </div>

                    <div>
                        <h6>About:</h6>
                        <div className="badge bg-secondary text-wrap">
                            {user.about}
                        </div>
                    </div>

                    <div>
                        {
                            me.username === username &&
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
                                    (!isLoading && me.username !== username) ? 
                                        user.is_knows_private 
                                        ? <p className="text-center"><IoEyeOffOutline className="fs-1" /> Private data</p>
                                        : <OtherUserKnows userId={user.id} />
                                        : <KnowsPage />
                                }
                            </div>
                            <div className={`tab-pane fade ${activeTab === "tasks" ? "show active" : ""}`}>
                                {
                                    (!isLoading && me.username !== username) ? 
                                        user.is_tasks_private 
                                        ? <p className="text-center"><IoEyeOffOutline className="fs-1" /> Private data</p>
                                        : <OtherUserTasks userId={user.id} />
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