import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import ResourceCard from "./ResourceCard";
import { Resource } from "../../types";

interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string;
  baseURL: string;
  activeTagId: number | null | undefined;
  skillsLength: number;
}

interface IState {
  resourcesArray: Resource[];
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
  });

export class ResourceView extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      resourcesArray: [],
    };
  }

  getResources = () => {
    if (
      this.props.activeTagId !== undefined &&
      this.props.activeTagId !== null
    ) {
      let url = `${this.props.baseURL}tag/${this.props.activeTagId}`;
      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.userToken,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.resources.length > 0) {
            this.setState({
              resourcesArray: json.resources,
            });
          } else {
            this.setState({
              resourcesArray: [],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.setState({
        resourcesArray: [],
      });
    }
  };

  componentDidUpdate(prevProps: any) {
    if (prevProps.activeTagId !== this.props.activeTagId) {
      this.getResources();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ResourceCard
          resourcesArray={this.state.resourcesArray}
          baseURL={this.props.baseURL}
          userToken={this.props.userToken}
          getResources={this.getResources}
          activeTagId={this.props.activeTagId}
          skillsLength={this.props.skillsLength}
        />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResourceView);
