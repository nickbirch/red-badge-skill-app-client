import React, { Component } from 'react'
import { User } from '../../types';
import { Redirect } from 'react-router-dom';
import {WithStyles, withStyles, createStyles, Theme} from '@material-ui/core/styles';
import logo from '../../assets/rocket.svg'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

interface AcceptedProps extends WithStyles<typeof styles> {
    storeUserDetails: (userToken: string, isAdmin: boolean, userId: number | null, firstName: string,) => void,
    baseURL: string,
    toggleFormType(): void
}

interface LoginType extends User {
    loggedIn: boolean
}

const styles = (theme: Theme) =>
createStyles({
    root: {
        color: theme.palette.primary.contrastText
    },
    paper: {
        paddingTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: "transparent"
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: '#fff !important',
      },
      formField: {
          color: '#fff !important',
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    });

export class Login extends Component<AcceptedProps, LoginType> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isAdmin: false,
            loggedIn: false
          };
      }
      
      updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          email: e.target.value
        });
      }

      updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
          password: e.target.value
        });
      }

      handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>  {
          e.preventDefault();
        let url: string = `${this.props.baseURL}user/login`;
        let userObject: {email: string, password: string} = {
            email:  this.state.email.trim(),
            password:  this.state.password.trim(),
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
                this.props.storeUserDetails(json.sessionToken, json.isAdmin, json.id, json.firstName);
                this.setState({
                    loggedIn: true
                })
            } else {

            };
    
        })
        .catch(err => {
            console.log(err);
        })
      }

    render() {
        if(this.state.loggedIn){
            return <Redirect to="/" />
        }

        const { classes }  = this.props;
        return (

            <Container component="main" maxWidth="xs" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <img src={logo} alt={"logo"} height="35px" />
              </Avatar>
              <Typography component="h1"  variant="h5">
                Sign In
              </Typography>
              <form className={classes.form} id="entryForm" noValidate onSubmit={this.handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  className={classes.formField}
                  value={this.state.email} 
                  onChange={this.updateEmail}
                  style={{color:'#fff !important'}}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link variant="body2" onClick={this.props.toggleFormType} className={classes.root}>
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Login)
