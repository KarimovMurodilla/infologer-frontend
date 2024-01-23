import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
    return (
        <li type="button" className="list-group-item list-group-item-action">
            <Link to={`/${user.username}`} style={{ textDecoration: "none", color: "black" }}>
                <h6 className="d-inline">{user.first_name} {user.last_name}</h6>
                <p className="d-inline p-2 blockquote-footer fs-6">{user.username}</p>
            </Link>
        </li>
        
    )
}


export default User;