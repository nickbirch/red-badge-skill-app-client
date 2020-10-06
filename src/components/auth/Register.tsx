import React, { Component, MouseEvent } from 'react'
import { User } from '../../types';

interface AcceptedProps {
    storeUserDetails: (userToken: string | null) => void,
    baseURL: string
}

export class Register extends Component<AcceptedProps, User> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isAdmin: false
          };
      }

      updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          email: e.target.value
        });
      }

      updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          firstName: e.target.value
        });
      }

      updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          lastName: e.target.value
        });
      }

      updatePassword = (e: React.ChangeEvent<HTMLInputElement>) =>  {
        this.setState({
          password: e.target.value
        });
      }


      handleSubmit = (e: MouseEvent) => {
          e.preventDefault();
        let url: string = `${this.props.baseURL}user/register`;
        let userObject: User = {
            firstName: this.state.firstName.trim(),
            lastName: this.state.lastName.trim(),
            email:  this.state.email.trim(),
            password:  this.state.password.trim(),
            isAdmin: this.state.isAdmin
        };

        fetch(url, {
            method: "POST",
            headers:    new Headers ({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({user: userObject})
        })
        .then(res => {
    
            if (res.status === 200) {
                return res.json();
            } else {
                return res.status;
            };
    
        })
        .then(json => {
    
            if (json !== 500 && json !== 401) {
                this.props.storeUserDetails(json.sessionToken);
                // console.log("Login.js user", json);
                // console.log("Login.js json.sessionToken", json.sessionToken);
                //toggle();
            } else {
                // console.log("Login.js error", json);
               // setErrForm("Login failed.");
            };
    
        })
        .catch(err => {
            console.log(err);
           // setErrForm(err);
        })
      }

    
    render() {
        return (
            <div>
                <input type="text" id="firstName" placeholder="First Name" value={this.state.firstName} onChange={(e) => {this.updateFirstName(e);}} />
                <input type="text" id="lastName" placeholder="Last Name" value={this.state.lastName} onChange={(e) => {this.updateLastName(e);}} />
                <input type="text" id="txtEmail" placeholder="Email Address" value={this.state.email} onChange={(e) => {this.updateEmail(e);}} />
                <input type="password" id="pwd" placeholder="Password" value={this.state.password} onChange={(e) => {this.updatePassword(e);}} />
                <button  onClick={this.handleSubmit}>Register</button>
            </div>
        )
    }
}

export default Register
