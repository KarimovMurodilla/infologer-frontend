// import React from "react";
// import {IoCloseCircleSharp, IoHammerSharp} from 'react-icons/io5'
// import AddUser from "./AddUser";

// class User extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             editForm: false
//         }
//     }

//     user = this.props.user
//     render() {
//         return (
//             <div className="user">
//                 <IoCloseCircleSharp className="delete-icon" onClick={() => this.props.onDelete(this.user.id)} />
//                 <IoHammerSharp className="edit-icon" onClick={() => {
//                     this.setState({
//                         editForm: !this.state.editForm
//                     })
//                 }} />
//                 <img src={this.user.avatar}></img>
//                 <h2>{this.user.name}</h2>
//                 <p>{this.user.about}</p>
//                 <p>{this.user.email}</p>
//                 {/* <p>{this.user.isHappy ? "Happy :)" : "Unhappy :("}</p> */}

//                 {this.state.editForm && <AddUser onAdd={this.props.onEdit} user={this.user} buttonName="Edit" />}
//             </div>
//         )
//     }
// }


// export default User;