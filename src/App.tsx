import React, {Component} from 'react';
import logo from './assets/rocket.svg';
import './App.css';
import API_URL from "./helpers/environment";
import Header from './site/Header';
import Auth from './site/Auth';
import UserView from "./site/UserView";

type AcceptedProps = {
};

interface IState {
  userToken: string | null
}


export default class App extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userToken: null
    };
  }

  storeUserDetails = (userToken: string | null) => {
    this.setState({
      userToken
    })
  }



render() {

  let baseURL: string = API_URL + "/";

  return (
    <div className="App">
      <Header />
      {(this.state.userToken) ? <UserView /> : <Auth storeUserDetails={this.storeUserDetails} baseURL={baseURL}/>}
    </div>
  );
}
}

