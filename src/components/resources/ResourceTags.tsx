import React, {Component} from 'react';
import {
    createStyles,
    WithStyles,
    withStyles,
    Theme,
  } from "@material-ui/core/styles";
import NewResourceTag from "./NewResourceTag";
import Chip from '@material-ui/core/Chip';
import { Tag } from '../../types';


interface AcceptedProps extends WithStyles<typeof styles> {
    resourceId: number;
    baseURL: string;
    userToken: string;
}

interface IState {
    tags: Tag[],
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
      background: "linear-gradient(147.85deg, #00BFC7 11.75%, rgba(39, 72, 241, 0.9) 86.71%)",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      color: "#fff",
      textTransform: "uppercase",
    },
  });

  export class ResourceTags extends Component<AcceptedProps, IState> {
    constructor(props: AcceptedProps) {
      super(props);
      this.state = {
        tags: []
      };
    }

    getResourceTags = () => {
        let url = `${this.props.baseURL}resource/${this.props.resourceId}`;
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
            tags: json.tags,
            });
           // console.log(this.state.tags);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount(){
            this.getResourceTags();
    }
    componentDidUpdate(prevProps: any){
        if(prevProps.resourceId !== this.props.resourceId){
            this.getResourceTags();
       }
    }

render() {
    const { classes } = this.props;
  return (
    <ul className={classes.root}>
      { this.state.tags.length > 0 ? this.state.tags.map((skill: Tag, index) => {
        return (
          <li key={index}>
            <Chip
              label={skill.skillName}
              size="small"
              className={classes.chip}
            />
          </li>
        );
      }) : null}
      <NewResourceTag userToken={this.props.userToken} baseURL={this.props.baseURL} resourceId={this.props.resourceId} getResourceTags={this.getResourceTags}/>
      </ul>
);
    }
}

export default withStyles(styles, { withTheme: true })(ResourceTags);