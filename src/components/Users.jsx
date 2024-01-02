import React from "react";
import User from "./User";


const Users = ({ users }) => {
    if (users.length > 0)
        return (
            <div className="list-group">
                {
                    users.map((user) => (
                        <User key={user.id} user={user} />
                    ))
                }
            </div>
        )
    else
        return (
            <div className="list-group">
                <h3 className="text-center">No users</h3>
            </div>
        )
}


export default Users;