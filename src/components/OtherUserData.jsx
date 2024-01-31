import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../auth/Api";
import Know from "./Know";
import getManyPlaceHolders from "./placeholders/KnowPlaceHolder";
import Task from "./Task";
import { TasksContext } from "../pages/Tasks";


export const OtherUserKnows = ({ userId }) => {
    const [knows, setKnows] = useState([]);
    const [knowsIsLoading, setIsLoading] = useState(true);
    const [isScrollLoading, setOnScrollLoading] = useState(true);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const urlTo = `/knows/${userId}?page=${page}`;
            const response = await api.get(urlTo);
            setKnows((prevData) => [...prevData, ...response.data]);
            setPage(prevPage => prevPage + 5);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false);
            setOnScrollLoading(false);
        }
    }

    const paginate = () => {
        if (isScrollLoading) {
            getData();
        }
    }

    useEffect(() => {
        paginate();
    }, [isScrollLoading]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setOnScrollLoading(true);
        }
    }

    return (
        <div>
            {knowsIsLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders(5)}
                </div>
            ) : knows.length > 0 ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {
                        knows && knows.slice().map((know) => (
                            <Know key={know.id} know={know} />
                        ))
                    }
                </div>
            ) : (
                <div className="text-center">
                    <p>No data</p>
                </div>
            )}
            {
                isScrollLoading &&
                (<div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders(1)}
                </div>)
            }
        </div>
    )
}


export const OtherUserTasks = ({ userId }) => {
    const [tasks, setTasks] = useState([]);
    const [tasksIsLoading, setIsLoading] = useState(true);
    const [isScrollLoading, setOnScrollLoading] = useState(true);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const urlTo = `/tasks/${userId}?page=${page}`;
            const response = await api.get(urlTo);
            setTasks((prevData) => [...prevData, ...response.data]);
            setPage(prevPage => prevPage + 5);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
                navigate("/auth/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        } finally {
            setIsLoading(false);
            setOnScrollLoading(false);
        }
    }

    const paginate = () => {
        if (isScrollLoading) {
            getData();
        }
    }

    useEffect(() => {
        paginate();
    }, [isScrollLoading]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        };
    }, []);

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setOnScrollLoading(true);
        }
    }

    return (
        <div>
            {tasksIsLoading ? (
                <div className="row mt-4 mb-5 justify-content-center">
                    {getManyPlaceHolders(1)}
                </div>
            ) : tasks.length > 0 ? (
                <div>
                    {
                        tasks.filter(task => task.status === true) &&
                        <div className="row mt-4 mb-5 justify-content-center">
                            {
                                tasks &&
                                tasks
                                    .filter(task => task.status === true)
                                    .slice()
                                    .map(task => 
                                        <TasksContext.Provider value={{ getData }}>
                                            <Task key={task.id} task={task} status={true} />
                                        </TasksContext.Provider>
                                    )
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


// export default OtherUserData;