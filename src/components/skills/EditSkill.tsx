import React, { Component } from "react";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string;
  baseURL: string;
  getSkills(): void;
  handleEditClick(arg: boolean): void;
  skillToEditId: number | null,
  skillToEditName: string,
  skillToEditBoolean: boolean | undefined,
  editOpen: boolean,
}

interface IState {
  activeLearning: boolean | undefined;
}

const styles = (theme: Theme) =>
  createStyles({
    active: {
      paddingLeft: "1rem",
    },
    flex: {
        justifyContent: 'space-between',
        display: "flex",
    }
  });

export class EditSkill extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      activeLearning: props.skillToEditBoolean,
    };
  }

  handleClose = () => {
    this.props.handleEditClick(false)
  };

  handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      activeLearning: event.target.checked,
    });
  };

  updateSkill = () => {
    let url: string = `${this.props.baseURL}myskills/update/${this.props.skillToEditId}`;
    let skillObject: { activeLearning: boolean | undefined} = {
      activeLearning: this.state.activeLearning,
    };

    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
      body: JSON.stringify({ skill: skillObject }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then(() => {
        this.props.handleEditClick(false)
        this.props.getSkills();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRemove = () => {
    let url: string = `${this.props.baseURL}myskills/delete/${this.props.skillToEditId}`;

    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      })
    })
      .then((res) => {
        if (res.status === 200) {
            this.props.handleEditClick(false)
            this.props.getSkills();
        } else {
          return res.status;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Dialog
          open={this.props.editOpen}
          onClose={this.props.handleEditClick}
          aria-labelledby="form-dialog-title"
        >
            <div className={classes.flex}>
                <DialogTitle id="form-dialog-title" >
                    Edit {this.props.skillToEditName}
                </DialogTitle>
                <Button onClick={this.handleClose} size="large" color="primary" startIcon={<CancelIcon />} >
                </Button>
            </div>
          <DialogContent>
            <DialogContentText>
              Change the learning status or delete this skill from your profile.
            </DialogContentText>
          </DialogContent>
          
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.activeLearning}
                  onChange={this.handleToggle}
                  name="activeLearning"
                  color="primary"
                />
              }
              label="Actively Learning"
              className={classes.active}
            />
          </FormGroup>
          <DialogActions className={classes.flex}>
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={this.handleRemove} color="secondary">
              Remove
            </Button>
            <Button variant="contained" onClick={this.updateSkill} color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditSkill);
