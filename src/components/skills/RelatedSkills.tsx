import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Chip from "@material-ui/core/Chip";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { SkillArray } from "../../types";

interface AcceptedProps extends WithStyles<typeof styles> {
  activeTagName: string;
  userToken: string;
  baseURL: string;
  updateSkillArray(skillArray: SkillArray[]): void;
}

interface IState {
  relatedSkills: string[];
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: "3rem",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(90deg, rgba(44, 44, 44, 0.81) 0%, rgba(44, 44, 44, 0.962647) 80.34%, #2C2C2C 100%)",
      borderBottomLeftRadius: "1.75rem",
    },
    body: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
    },
    heading: {
      fontSize: "1.2rem",
      textTransform: "uppercase",
      color: "#fff",
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
    },
    chip: {
      margin: theme.spacing(0.5),
      background:
        "linear-gradient(147.85deg, #00BFC7 11.75%, rgba(39, 72, 241, 0.9) 86.71%)",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      color: "#fff",
      textTransform: "uppercase",
    },
    icon: {
      color: "#fff",
    },
  });

export class RelatedSkills extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      relatedSkills: [],
    };
  }

  getRelatedTags = () => {
    const encoded = encodeURIComponent(this.props.activeTagName);
    const stackURL = `https://api.stackexchange.com/2.2/tags/${encoded}/related?pagesize=100&site=stackoverflow`;

    fetch(stackURL)
      .then((res) => res.json())
      .then((json) => {
        let shortenedList = json.items.slice(1, 21); // shorten number of skill tags to show
        this.setState({
          relatedSkills: shortenedList,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAdd = (skill: string) => {
    let url: string = `${this.props.baseURL}myskills/add`;

    let skillObject: { skillName: string; activeLearning: boolean } = {
      skillName: skill,
      activeLearning: true,
    };

    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
      body: JSON.stringify({ skill: skillObject }),
    })
      .then((res) => {
        if (res.status === 200) {
          this.reGetSkills();
          return res.json();
        } else {
          return res.status;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  reGetSkills = () => {
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
        console.log(json);
        this.props.updateSkillArray(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidUpdate(prevProps: any) {
    if (prevProps.activeTagName !== this.props.activeTagName) {
      this.getRelatedTags();
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Accordion className={classes.root}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.icon} />}
          >
            <Typography
              className={classes.heading}
            >{`Skills Related to ${this.props.activeTagName}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul className={classes.body}>
              {this.state.relatedSkills.length > 0 ? (
                this.state.relatedSkills.map((skill: any, index) => {
                  return (
                    <li key={index}>
                      <Chip
                        label={skill.name}
                        className={classes.chip}
                        onDelete={() => this.handleAdd(skill.name)}
                        deleteIcon={<AddCircleIcon className={classes.icon} />}
                      />
                    </li>
                  );
                })
              ) : (
                <Typography className={classes.heading}>
                  We could not find any related skills
                </Typography>
              )}
            </ul>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(RelatedSkills);
