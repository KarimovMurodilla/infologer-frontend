import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../auth/Api";


const You = () => {
    const [me, setMe] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
		api.get('/users/me')
			.then((response) => {
                setMe(response.data);
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
    }, []);

    return (
        <div className="container mt-4 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="row justify-content-center">
                <div className="d-flex justify-content-between">
                    <div className="shadow p-3 mb-5 bg-body-tertiary rounded">
                        <h4>{me.first_name}</h4>
                        <h4>{me.last_name}</h4>
                        <hr />
                        <p>@{me.username}</p>
                    </div>

                    <div>
                        <h6>About:</h6>
                        <div className="badge bg-secondary text-wrap" style={{ width: 12 + 'rem' }}>
                            {me.about}
                        </div>
                    </div>

                    <div>
                        <Link to="/settings" type="button" className="btn">
                            <i className="fas fa-cog fs-4"></i>
                        </Link>
                    </div>
                </div>

                <hr />

                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <ul className="nav nav-underline" id="myTabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="tab1" data-bs-toggle="tab" href="#knows">Knows</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="tab2" data-bs-toggle="tab" href="#tasks">Tasks</a>
                                    </li>
                                </ul>
                                <div className="tab-content mt-5">
                                    <div className="tab-pane fade show active" id="knows">
                                        <p>Content for Tab 1</p>
                                    </div>
                                    <div className="tab-pane fade" id="tasks">
                                        <p>Content for Tab 2</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}


export default You;