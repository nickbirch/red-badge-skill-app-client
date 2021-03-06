import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { SkillArray } from '../../types'

interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string;
  baseURL: string;
  updateSkillArray(skillArray: SkillArray[]): void;
}

interface TagArray {
  skillName: string;
}

interface IState {
  tagArray: TagArray[];
  open: boolean;
  activeLearning: boolean;
  searchField: string[];
  newState: string;
}

const styles = (theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
      background: "linear-gradient(147.85deg, #00C102 11.75%, #00C102 86.71%)",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      textTransform: "uppercase",
    },
    active: {
      paddingLeft: "1rem",
    },
    search: {
      color: "#000000",
      paddingLeft: "1rem",
    },
    flex: {
      justifyContent: "space-between",
      display: "flex",
    },
  });

export class NewSkill extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      tagArray: [],
      open: false,
      activeLearning: true,
      searchField: [],
      newState: ''
    };
  }

  getTags = () => {
    let url = `${this.props.baseURL}tag`;

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
       // let edited = json.slice(0, 1000);
        this.setState({
          tagArray: json,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClickOpen = () => {
    this.getTags();
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      activeLearning: event.target.checked,
    });
  };

  updateSearchField = (value: string[]) => {
    this.setState({
      searchField: value,
    });
  };

  updateNewState = (value: string) => {
    this.setState({
      newState: value,
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
          this.props.updateSkillArray(json)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addNewSkill = async () => {
    let url: string = `${this.props.baseURL}myskills/add`;

    for (let i = 0; i < this.state.searchField.length; i++) {
      let skillObject: { skillName: string; activeLearning: boolean } = {
        skillName: this.state.searchField[i],
        activeLearning: this.state.activeLearning,
      };

      await fetch(url, {
        method: "POST",
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
        .catch((err) => {
          console.log(err);
        });
    }

    this.setState({
      open: false,
      searchField: [],
    });
    this.reGetSkills();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Chip
          label={"Add Skill"}
          onClick={this.handleClickOpen}
          onDelete={this.handleClickOpen}
          className={classes.chip}
          color="secondary"
          deleteIcon={<AddCircleIcon height="18px" />}
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes.flex}>
            <DialogTitle id="form-dialog-title">Add Skill</DialogTitle>
            <Button
              onClick={this.handleClose}
              size="large"
              color="primary"
              startIcon={<CancelIcon />}
            ></Button>
          </div>
          <DialogContent>
            <DialogContentText>
              To add a new skill, start typing your search below to select one.
            </DialogContentText>
          </DialogContent>
          <div style={{ width: 300 }}>
            <Autocomplete
              className={classes.search}
              disableClearable
              multiple
              freeSolo
              // input={this.state.newState}
              // onInputChange={(event, newInputValue) => {this.updateNewState(newInputValue)}}
              value={this.state.searchField}
              onChange={(event, newInputValue) => {
                this.updateSearchField(newInputValue);
              }}
              options={this.state.tagArray.map(
                (tag: TagArray) => tag.skillName
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Skills"
                  margin="normal"
                  variant="outlined"
                  autoFocus
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
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
          <DialogActions>
            <Button
              onClick={this.addNewSkill}
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewSkill);
