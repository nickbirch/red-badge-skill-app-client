import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import UserView from "./UserView";
import AdminView from "./AdminView";
import logo from "../assets/rocket.svg";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";


interface IProps {
  userToken: string;
  isAdmin: boolean;
  userId: number | null;
  firstName: string;
  baseURL: string,
  clearUserDetails(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: "#00000",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: "#F9F9F9",
        textDecoration: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase"

      },
    icon: {
      flexGrow: 1,
      color: "F9F9F9",
      textAlign: "left",
    },
    iconBackground: {
        background: "#FFF",
        width: "2.7rem",
        height: "2.7rem",
        borderRadius: "50%",
        verticalAlign: "middle",
        padding: "0.2rem",
    }
  })
);

const Header: React.FunctionComponent<IProps> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.menuBar}>
        <Toolbar>
          <Link className={classes.icon} to="/">
            <img src={logo} alt={"logo"} className={classes.iconBackground} />
          </Link>
          <nav>
            <Link className={classes.link} color="inherit" to="/">My Skills</Link>
          {props.isAdmin ? (
              <Link className={classes.link} color="inherit" to="/admin">Admin</Link>
          ) : null}
          <Button color="inherit" variant="outlined" onClick={props.clearUserDetails}>Logout</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/">
          <UserView userId={props.userId} firstName={props.firstName} userToken={props.userToken} baseURL={props.baseURL}/>
        </Route>
        <Route exact path="/admin">
          <AdminView />
        </Route>
      </Switch>
    </div>
  );
};

export default Header;
