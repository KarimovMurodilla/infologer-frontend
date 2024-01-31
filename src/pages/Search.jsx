import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

import Users from "../components/Users";

const Search = () => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    const getDataByUsername = () => {
        const baseUrl = "http://localhost:8000/users/filter?username="

        username.trim() ? 
        axios.get(baseUrl + username)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    localStorage.clear();
                    navigate("/auth/login");
                } else {
                    console.error('Error fetching user data:', error);
                }
            }) 
        : setUsers([]);
    }

    return (
        <div className="container">
            <div className="input-group mb-5">
                {/* <span className="input-group-text" id="basic-addon1">@</span> */}
                <input type="text" onChange={(event) => setUsername(event.target.value)} className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon2" />
                <button 
                    className="btn btn-outline-secondary" 
                    type="button" 
                    id="button-addon2"
                    onClick={getDataByUsername}
                >
                    <AiOutlineSearch />
                </button>
            </div>

            {users.length > 0 && <Users users={users} />}
        </div>
    )
}


export default Search;