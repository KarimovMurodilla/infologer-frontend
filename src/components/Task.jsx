import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdMore } from "react-icons/io";

import api from "../auth/Api";
import { TasksContext } from "../pages/Tasks";

const Task = ({ task, status }) => {
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const { getData } = useContext(TasksContext);

    const handleDone = async () => {
        try {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const data = {
                description: description,
                status: true,
            };
            const response = await api.patch(`/tasks/${task.id}`,
                data,
                { headers }
            );
            console.log(response);
            getData();

        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    const statusFalse = (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div style={{ width: 100 + '%' }} data-bs-toggle="collapse" data-bs-target={`#s${task.id}`}
                        aria-expanded="false" aria-controls={`s${task.id}`}>
                        <h5>{task.title}</h5>
                    </div>

                    <div className="dropdown">
                        <button className="btn dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <IoMdMore className="fs-4" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item" href="#">Edit</a></li>
                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                        </ul>
                    </div>
                </div>

                <div className="collapse" id={`s${task.id}`}>
                    <div className="card-body text-secondary">
                        <textarea
                            className="card-text transparentTextArea"
                            placeholder="Describe the remarkable things you've achieved..."
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="d-grid gap-2">
                        <button
                            type="button"
                            className="btn btn-success float-end"
                            onClick={handleDone}
                            disabled={!description}
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const statusTrue = (
        <div className="col-md-8">
            <div className="card border-secondary mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5>{task.title}</h5>
                    </div>

                    <div className="dropdown">
                        <button className="btn dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                            <IoMdMore className="fs-4" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li><a className="dropdown-item" href="#">Edit</a></li>
                            <li><a className="dropdown-item text-danger" href="#">Delete</a></li>
                        </ul>
                    </div>
                </div>

                <div className="card-body text-secondary">
                    <textarea
                        className="card-text transparentTextArea"
                        placeholder="Describe the remarkable things you've achieved..."
                        readOnly={true}
                        value={task.description}
                        style={{ resize: "none" }}
                    />
                </div>
            </div>
        </div>
    );

    return status ? statusTrue : statusFalse;
}

export default Task;
