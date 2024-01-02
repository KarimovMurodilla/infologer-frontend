import React from "react";


class AddUser extends React.Component {
    userAdd = {}
    constructor(props) {
        super(props)
        this.state = {
            first_name: this.props.user && this.props.user.first_name,
            last_name: this.props.user && this.props.user.last_name,
            isHappy: this.props.user && this.props.user.isHappy
        }
    }

    render() {
        return (
            <form ref={(el) => this.myForm = el}>
                <input placeholder="First name" value={this.state.first_name} onChange={(event) => this.setState({ first_name: event.target.value })} />
                <input placeholder="Last name" value={this.state.last_name} onChange={(event) => this.setState({ last_name: event.target.value })} />
                <label htmlFor="isHappy">Do you happy?</label>
                <input type="checkbox" checked={this.state.isHappy} id="isHappy" onChange={(event) => this.setState({ isHappy: event.target.checked })} />
                <button type="button" onClick={() => {
                    this.myForm.reset()
                    this.userAdd = {
                        first_name: this.state.first_name,
                        last_name: this.state.last_name,
                        isHappy: this.state.isHappy,
                    }
                    if (this.props.user)
                        this.userAdd.id = this.props.user.id
                    this.props.onAdd(this.userAdd)
                }
                }>{this.props.buttonName}</button>
            </form>
        )
    }
}


export default AddUser;