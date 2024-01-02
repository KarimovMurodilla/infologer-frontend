import React, { useState, useEffect } from "react";
import axios from "axios";


const Tasks = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const baseUrl = 'http://localhost:8000/tasks';

        axios.get(baseUrl)
            .then((res) => {
                setTasks(res.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <div className="container mt-5 mb-5">
            <div className="row mt-4 justify-content-center">
                <div className="col-md-8">
                    <div className="d-grid gap-2">
                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#inputCollapse" aria-expanded="false" aria-controls="inputCollapse">
                            <i className="fa-solid fa-plus fa-2x"></i>
                        </button>
                    </div>

                    <div className="collapse" id="inputCollapse">
                        <div className="card card-body">
                            <div className="row justify-content-center">
                                <div>
                                    <form>
                                        <div className="form-floating mb-1">
                                            <label htmlFor="postTitle" className="form-label"></label>
                                            <input type="text" className="form-control form-control-sm" id="postTitle"
                                                placeholder="Enter title" />
                                            <label htmlFor="floatingInput">Title</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <label htmlFor="postText" className="form-label"></label>
                                            <textarea className="form-control form-control-sm" id="floatingTextarea2" style={{ height: 100 + 'px' }} placeholder="Write your text..."></textarea>
                                            <label htmlFor="floatingTextarea">Describe your task...</label>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-secondary float-end">Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-secondary mt-5 mb-5">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                                <h5>Header</h5>
                            </div>

                            <div className="dropdown">
                                <button className="btn dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body text-secondary" data-bs-toggle="collapse" data-bs-target="#task-1"
                            aria-expanded="false" aria-controls="task-1">
                            <h5 className="card-title">Secondary card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                                the card's content.</p>
                        </div>
                        <div className="collapse" id="task-1">
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-success float-end">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Tasks;