import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";

import api from "../auth/Api";
import Task from "../components/Task";
import getManyPlaceHolders from "../components/placeholders/TaskPlaceHolder";


// Create a context
export const TasksContext = createContext();

const TasksPage = ({ showCompleted, userId }) => {
    const [tasks, setTasks] = useState([]);
    const [tasksIsLoading, setIsLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const urlTo = userId ? `/tasks/${userId}` : '/tasks';
            const response = await api.get(urlTo);
            setTasks(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false); // Handle errors and stop loading
        }
    }

    // Fetch data when the component mounts
    useEffect(() => {
        getData();
    }, [userId]);

    return (
        showCompleted ?
            <TasksContext.Provider value={{ tasks, tasksIsLoading }}>
                <ShowTasks showCompleted={showCompleted} />
            </TasksContext.Provider>
            :
            <TasksContext.Provider value={{ tasks, getData, tasksIsLoading }}>
                <Tasks />
            </TasksContext.Provider>
    );
};

const Tasks = () => {
    const { getData } = useContext(TasksContext);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    const handlePost = async () => {
        try {
            const headers = {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const data = {
                title: title,
            };
            const response = await api.post('/tasks',
                data,
                { headers }
            );
            console.log(response);
            await getData();
            setTitle("");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false); // Handle errors and stop loading
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row mt-4 justify-content-center">
                <div className="col-md-8">
                    <div className="d-grid gap-2">
                        <button className="btn btn-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#inputCollapse" aria-expanded="false" aria-controls="inputCollapse">
                            <IoIosAddCircleOutline className="fs-1" />
                        </button>
                    </div>

                    <div className="collapse" id="inputCollapse">
                        <div className="card card-body">
                            <div className="row justify-content-center">
                                <div>
                                    <form>
                                        <div className="form-floating mb-3">
                                            <label htmlFor="postTitle" className="form-label"></label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm"
                                                id="postTitle"
                                                placeholder="Enter title"
                                                onChange={(e) => setTitle(e.target.value)}
                                                value={title}
                                            />
                                            <label htmlFor="floatingInput" className="text-secondary">What are you planning to find out?</label>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary float-end"
                                                onClick={handlePost}
                                                disabled={!title}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowTasks />
        </div>
    )
}


const ShowTasks = ({ showCompleted }) => {
    const { tasks, tasksIsLoading } = useContext(TasksContext);

    return (
        <div>
            {tasksIsLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders()}
                </div>
            ) : tasks.length > 0 ? (
                <div>
                    {
                        (tasks && !showCompleted) &&
                        <div className="row mt-4 mb-5 justify-content-center">
                            {
                            tasks
                                .filter(task => task.status === false)
                                .slice()
                                .reverse()
                                .map(task => <Task key={task.id} task={task} status={false} />)
                            }
                        </div>
                    }

                    {
                        tasks.filter(task => task.status === true) &&
                        <div className="row mt-4 mb-5 justify-content-center">
                            {!showCompleted && <h3 className="text-center mb-4">Completed tasks</h3>}
                            {
                                tasks &&
                                tasks
                                    .filter(task => task.status === true)
                                    .slice()
                                    .reverse()
                                    .map(task => <Task key={task.id} task={task} status={true} />)
                            }
                        </div>
                    }
                </div>
            ) : (
                <div className="text-center mt-4">
                    <p>No data...</p>
                </div>
            )}
        </div>
    )
}

export default TasksPage;