import React, {Component} from 'react';
import {
    createStyles,
    WithStyles,
    withStyles,
    Theme,
  } from "@material-ui/core/styles";
import { Resource } from '../../types';


interface AcceptedProps  extends WithStyles<typeof styles> {
    userToken: string;
    baseURL: string;
    activeTagId: number | null,
}

interface IState {
    resourcesArray: Resource[],
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
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
        let url = `${this.props.baseURL}tag/${this.props.activeTagId}`;
        console.log(url)
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
            resourcesArray: json,
            });
            console.log(this.state.resourcesArray);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidUpdate(prevProps: any){
        if(prevProps.activeTagId !== this.props.activeTagId){
            this.getResources();
        }
    }

render() {
        const { classes } = this.props;
  return (
    <div className={classes.root}>
        I'm the Resource View
    </div>
);
  }
}

export default withStyles(styles, { withTheme: true })(ResourceView);