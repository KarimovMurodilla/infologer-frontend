import React, { useState } from "react";
import axios from "axios";

import Users from "../components/Users";

const Search = () => {

    const [users, setUsers] = useState([])

    const getDataByUsername = (username) => {
        const baseUrl = "http://localhost:8000/users/filter?username="

        axios.get(baseUrl + username)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }

    return (
        <div className="container mt-4">
            <div className="input-group mb-5">
                <span className="input-group-text" id="basic-addon1">@</span>
                <input type="text" onChange={(event) => getDataByUsername(event.target.value)} className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                    <i className="fa fa-magnifying-glass" title="Search"></i>
                </button>
            </div>

            <Users users={users} />
        </div>
    )
}


export default Search;