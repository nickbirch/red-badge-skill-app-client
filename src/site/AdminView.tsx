import React, { Component } from "react";
import ViewUserSkills from '../components/admin/ViewUserSkills'
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { UserSkills, SkillArray } from "../types";

interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string,
  baseURL: string,
}

interface IState {
  userArray: UserSkills[],
  userSkills: SkillArray[],
  open: boolean,
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "130vh",
      minHeight: "140vh",
      backgroundColor: "#3585bb",
      paddingTop: "3rem",
      borderRadius: "1.75rem",
      marginTop: "3rem",
    },
    skillCard: {
      minWidth: 275,
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(90deg, rgba(44, 44, 44, 0.81) 0%, rgba(44, 44, 44, 0.962647) 80.34%, #2C2C2C 100%)",
      borderRadius: "1.75rem",
    },
    header: {
      textTransform: "uppercase",
      background:
        "linear-gradient(147.85deg, #00BFC7 11.75%, rgba(39, 72, 241, 0.9) 86.71%)",
      color: theme.palette.primary.contrastText,
      fontSize: "2rem",
    },
    tableHeader: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.contrastText,
    },
    tableBody: {
        backgroundColor: "#A9A9A9",
        color: theme.palette.primary.contrastText,
    },
  });

export class AdminView extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userArray: [],
      userSkills: [],
      open: false,
    };
  }

  getUsers = () => {
    let url: string = `${this.props.baseURL}user`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          userArray: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClick = (skills: SkillArray[]) => {
    this.setState({
        userSkills: skills,
        open: true
    })
  }

   handleClose = () => {
    this.setState({
        open: false
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.root}>
          <TableContainer component={Paper}>
            <Table aria-label="table">
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell align="center" className={classes.tableHeader}>First Name</TableCell>
                  <TableCell align="center" className={classes.tableHeader}>Last Name</TableCell>
                  <TableCell align="center" className={classes.tableHeader}>Email Address</TableCell>
                  <TableCell align="center" className={classes.tableHeader}>Admin</TableCell>
                  <TableCell align="center" className={classes.tableHeader}>Skills</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {this.state.userArray.map((row, index) => {
                  let admin;

                  if (row.isAdmin === true) {
                    admin = "YES";
                  } else {
                    admin = "NO";
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.lastName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{admin}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => this.handleClick(row.userSkills)} variant="contained" color="primary">
                            See Skills
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        {this.state.open ? (
          <ViewUserSkills
          userSkills={this.state.userSkills}
          open={this.state.open}
          handleClose={this.handleClose}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AdminView);
