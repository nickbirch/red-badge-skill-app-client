import React, { Component } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

interface AcceptedProps {
  storeUserDetails: (
    userToken: string,
    isAdmin: boolean,
    userId: number | null,
    firstName: string,
  ) => void;
  baseURL: string;
}

interface IState {
  showRegister: boolean;
}

export class Auth extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      showRegister: false,
    };
  }

  toggleFormType = () => {
    if (this.state.showRegister) {
      this.setState({
        showRegister: false,
      });
    } else if (!this.state.showRegister) {
      this.setState({
        showRegister: true,
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.showRegister ? (
          <Register
            storeUserDetails={this.props.storeUserDetails}
            baseURL={this.props.baseURL}
            toggleFormType={this.toggleFormType}
          />
        ) : (
          <Login
            storeUserDetails={this.props.storeUserDetails}
            baseURL={this.props.baseURL}
            toggleFormType={this.toggleFormType}
          />
        )}
      </div>
    );
  }
}

export default Auth;
