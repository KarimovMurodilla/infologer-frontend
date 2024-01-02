import React from "react";

const User = ({ user }) => {
    return (
        <div>
            <button type="button" className="list-group-item list-group-item-action">
                <h6 className="d-inline">{user.first_name} {user.last_name}</h6>
                <p className="d-inline p-2 blockquote-footer fs-6">{user.username}</p>
            </button>
        </div>
    )
}


export default User;