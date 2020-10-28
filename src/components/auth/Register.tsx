import React, { Component } from "react";
import { User } from "../../types";
import { Redirect } from "react-router-dom";
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import logo from "../../assets/rocket.svg";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

interface AcceptedProps extends WithStyles<typeof styles> {
  storeUserDetails: (
    userToken: string,
    isAdmin: boolean,
    userId: number | null,
    firstName: string
  ) => void;
  baseURL: string;
  toggleFormType(): void;
}

interface RegisterType extends User {
  loggedIn: boolean;
  loading: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.contrastText,
    },
    paper: {
      paddingTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "1.5rem",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "transparent",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
    },
  });

export class Register extends Component<AcceptedProps, RegisterType> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isAdmin: false,
      loggedIn: false,
      loading: false,
    };
  }

  updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: e.target.value,
    });
  };

  updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    let url: string = `${this.props.baseURL}user/register`;
    let userObject: User = {
      firstName: this.state.firstName.trim(),
      lastName: this.state.lastName.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      isAdmin: this.state.isAdmin,
    };

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ user: userObject }),
    })
      .then((res) => {
        this.setState({
          loading: false,
        });

        if (res.status === 200) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then((json) => {
        if (json !== 500 && json !== 401) {
          this.props.storeUserDetails(
            json.sessionToken,
            json.isAdmin,
            json.id,
            json.firstName
          );
          this.setState({
            loggedIn: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // setErrForm(err);
      });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" />;
    }
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={this.state.loading}>
          <CircularProgress />
        </Backdrop>
        <Container component="main" maxWidth="xs" className={classes.root}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <img src={logo} alt={"logo"} height="35px" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.handleSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={this.state.firstName}
                    onChange={this.updateFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    value={this.state.lastName}
                    onChange={this.updateLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.updateEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.updatePassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    variant="body2"
                    onClick={this.props.toggleFormType}
                    className={classes.root}
                  >
                    Already have an account? Sign In Instead
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Register);
