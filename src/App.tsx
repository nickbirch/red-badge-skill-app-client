import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import API_URL from "./helpers/environment";
import Header from "./site/Header";
import Auth from "./site/Auth";


type AcceptedProps = {};

interface IState {
  userToken: string,
  isAdmin: boolean,
  userId: number | null,
  firstName: string
}

export default class App extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userToken: '',
      isAdmin: false,
      userId: null,
      firstName: ''
    };
  }

  storeUserDetails = (userToken: string, isAdmin: boolean, userId: number | null, firstName: string) => {
    this.setState({
      userToken,
      isAdmin,
      userId,
      firstName
    });
  };

  clearUserDetails = () => {
    this.setState({
      userToken: '',
      isAdmin: false,
      userId: null,
      firstName: '',
    })
  }

  render() {
    let baseURL: string = API_URL + "/";

    return (
      <div className="App">
        {this.state.userToken ? (
          <div>
            <Router>
              <Header userToken={this.state.userToken} isAdmin={this.state.isAdmin} userId={this.state.userId} firstName={this.state.firstName} clearUserDetails={this.clearUserDetails} baseURL={baseURL}/>
            </Router>
          </div>
        ) : (
          <Auth storeUserDetails={this.storeUserDetails} baseURL={baseURL} />
        )}
      </div>
    );
  }
}
