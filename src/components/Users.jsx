import React from "react";
import User from "./User";


const Users = ({ users }) => {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                {
                    users.map((user) => (
                        <User key={user.id} user={user} />
                    ))
                }
            </ul>
        </div>
    )
}


export default Users;