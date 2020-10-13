import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import ResourceTags from "./ResourceTags";
import EditResource from "./EditResource";
import NewResource from "./NewResource";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Resource } from "../../types";

interface AcceptedProps extends WithStyles<typeof styles> {
  resourcesArray: Resource[];
  baseURL: string;
  userToken: string;
  activeTagId: number | null | undefined,
  getResources(): void;
}

interface IState {
  id: number;
  title: string;
  description: string;
  type: string;
  editOpen: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      //display: 'flex',
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    resourceCard: {
      minWidth: 275,
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(90deg, rgba(44, 44, 44, 0.81) 0%, rgba(44, 44, 44, 0.962647) 80.34%, #2C2C2C 100%)",
      borderRadius: "1.75rem",
      margin: "1.5rem",
      flexGrow: 1,
    },
    header: {
      //textTransform: "uppercase",
      background:
        "linear-gradient(147.85deg, #00BFC7 11.75%, rgba(39, 72, 241, 0.9) 86.71%)",
      color: theme.palette.primary.contrastText,
      fontSize: "1.25rem",
      textDecoration: "none",
    },
    chip: {
      margin: theme.spacing(0.5),
      background: "linear-gradient(147.85deg, #00C102 11.75%, #00C102 86.71%)",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "left",
      backgroundColor: theme.palette.background.default,
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      marginBottom: "1rem",
    },
    imagePaper: {
      display: "flex",
      backgroundColor: theme.palette.background.default,
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      width: "5rem",
      height: "5rem",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "4rem",
      height: "4rem",
    },
    imageTitle: {
      textAlign: "center",
      color: theme.palette.primary.contrastText,
      fontSize: "0.9rem",
      fontWeight: "bold",
      marginTop: "0.5rem",
    },
    title: {
      textAlign: "left",
      color: theme.palette.primary.contrastText,
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.contrastText,
    },
    edit: {
      marginLeft: "-3rem",
    },
    description: {
      textAlign: "left",
      color: theme.palette.primary.contrastText,
      fontSize: "0.85rem",
    },
    type: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap-reverse",
      alignContent: "flex-end",
      padding: "1.5rem 1rem !important",
    },
  });

export class ResourceCard extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      description: "",
      type: "",
      editOpen: false,
    };
  }

  toggleEdit = (resource: Resource) => {
    this.setState({
      id: resource.id,
      title: resource.title,
      description: resource.description,
      type: resource.type,
      editOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      editOpen: false,
    });
  };

  updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: e.target.value,
    });
  };

  updateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      description: e.target.value,
    });
  };

  updateType = (e: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      type: e.target.value as string,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ul className={classes.root}>
        <NewResource userToken={this.props.userToken} baseURL={this.props.baseURL} activeTagId={this.props.activeTagId} getResources={this.props.getResources} />
          {this.props.resourcesArray.length > 0
            ? this.props.resourcesArray.map((resource: Resource, index) => {
                return (
                  <li key={index}>
                    <Card className={classes.resourceCard}>
                      <CardHeader
                        className={classes.header}
                        title={
                          <a
                            href={`${resource.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classes.link}
                          >
                            {resource.title}
                          </a>
                        }
                        action={
                          <IconButton
                            onClick={() => this.toggleEdit(resource)}
                            color="inherit"
                            className={classes.edit}
                          >
                            <EditIcon />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <Grid container spacing={3}>
                          <Grid item xs={3} className={classes.type}>
                            <Typography className={classes.imageTitle}>
                              {`${resource.type}`}
                            </Typography>
                            <Paper className={classes.imagePaper}>
                              <a
                                href={`${resource.link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={`https://www.google.com/s2/favicons?sz=64&domain_url=${resource.link}`}
                                  alt=""
                                  className={classes.image}
                                />
                              </a>
                            </Paper>
                          </Grid>
                          <Grid item xs={9}>
                            <Typography className={classes.title}>
                              Description:
                            </Typography>
                            <a
                              href={`${resource.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={classes.link}
                            >
                              <Paper className={classes.paper}>
                                <Typography className={classes.description}>
                                  {`${resource.description}`}
                                </Typography>
                              </Paper>
                            </a>
                            <Typography className={classes.title}>
                              Tags:
                            </Typography>
                            <ResourceTags
                              userToken={this.props.userToken}
                              baseURL={this.props.baseURL}
                              resourceId={resource.id}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </li>
                );
              })
            : null}
        </ul>
        {this.state.editOpen ? (
          <EditResource
            userToken={this.props.userToken}
            baseURL={this.props.baseURL}
            currentState={this.state}
            handleClose={this.handleClose}
            updateTitle={this.updateTitle}
            updateDescription={this.updateDescription}
            updateType={this.updateType}
            getResources={this.props.getResources}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResourceCard);
