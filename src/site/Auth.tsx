import React, { Component } from 'react'
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';


interface AcceptedProps {
    storeUserDetails: (userToken: string | null) => void,
    baseURL: string
}

export class Auth extends Component<AcceptedProps> {
    render() {
        return (
            <div>
                <Login storeUserDetails={this.props.storeUserDetails} baseURL={this.props.baseURL}/>
                
                <Register storeUserDetails={this.props.storeUserDetails} baseURL={this.props.baseURL}/>
            </div>
        )
    }
}

export default Auth
