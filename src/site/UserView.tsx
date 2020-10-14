import React, { Component } from "react";
import SkillChips from "../components/skills/SkillChips";
import EditSkill from "../components/skills/EditSkill";
import ResourcesView from "../components/resources/ResourcesView";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { SkillArray } from "../types";

interface AcceptedProps extends WithStyles<typeof styles> {
  userId: number | null;
  userToken: string;
  firstName: string;
  baseURL: string;
}

interface IState {
  skillArray: SkillArray[];
  activeSkillId: number | null | undefined;
  activeTagId: number | null | undefined;
  activeTagName: string;
  editOpen: boolean;
  activeSkillBoolean: boolean | undefined;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "100vh",
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
    headerTwo: {
      textTransform: "uppercase",
      marginTop: "3rem",
      color: theme.palette.primary.contrastText,
      fontSize: "1.75rem",
    },
  });

export class UserView extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      skillArray: [],
      activeSkillId: null,
      activeTagId: null,
      activeTagName: "",
      activeSkillBoolean: undefined,
      editOpen: false,
    };
  }

  getSkills = () => {
    let url: string = `${this.props.baseURL}myskills`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) {
          this.setState({
            skillArray: json,
            activeTagName: json[0].tag.skillName,
            activeTagId: json[0].tagId,
          });
        } else {
            this.setState({
                skillArray: [],
                activeTagName: '',
                activeTagId: null,
              });
        }
        //console.log(this.state.skillArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updateActiveSkillId = (value: SkillArray) => {
    this.setState({
      activeSkillId: value.id,
      activeTagName: value.tag.skillName,
      activeSkillBoolean: value.activeLearning,
      activeTagId: value.tagId,
    });
  };

  handleEditClick = (editOpen: boolean) => {
    this.setState({
      editOpen: editOpen,
    });
  };

  componentDidMount() {
    this.getSkills();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm" className={classes.root}>
          <Card className={classes.skillCard}>
            <CardHeader
              className={classes.header}
              title={`${this.props.firstName}'s Skills `}
            />
            <CardContent>
              <SkillChips
                skills={this.state.skillArray}
                baseURL={this.props.baseURL}
                updateActiveSkillId={this.updateActiveSkillId}
                userToken={this.props.userToken}
                getSkills={this.getSkills}
                handleEditClick={this.handleEditClick}
              />
            </CardContent>
          </Card>
          {this.state.skillArray.length > 0 ? (
            <Typography
              component="h1"
              variant="h4"
              className={classes.headerTwo}
            >
              {`${this.state.activeTagName} Resources`}
            </Typography>
          ) : (
            <Typography
              component="h1"
              variant="h4"
              className={classes.headerTwo}
            >
              {`Add Skills to See Resources`}
            </Typography>
          )}

          <ResourcesView
            userToken={this.props.userToken}
            baseURL={this.props.baseURL}
            activeTagId={this.state.activeTagId}
            skillsLength={this.state.skillArray.length}
          />
        </Container>
        {this.state.editOpen ? (
          <EditSkill
            userToken={this.props.userToken}
            baseURL={this.props.baseURL}
            getSkills={this.getSkills}
            skillToEditName={this.state.activeTagName}
            skillToEditId={this.state.activeSkillId}
            skillToEditBoolean={this.state.activeSkillBoolean}
            handleEditClick={this.handleEditClick}
            editOpen={this.state.editOpen}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserView);
