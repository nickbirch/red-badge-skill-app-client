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
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string;
  baseURL: string;
  resourceId: number;
  getResourceTags(): void;
}

interface TagArray {
  skillName: string;
}

interface IState {
  tagArray: TagArray[];
  open: boolean;
  searchField: string;
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
        justifyContent: 'space-between',
        display: "flex",
    }
  });

export class NewResourceTag extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      tagArray: [],
      open: false,
      searchField: "",
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
        let edited = json.slice(0, 1000);
        this.setState({
          tagArray: edited,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addNewTag = () => {
    let url: string = `${this.props.baseURL}resource/addtag/${this.props.resourceId}`;
    let skillObject: { skillName: string; } = {
      skillName: this.state.searchField,
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
          return res.json();
        } else {
          return res.status;
        }
      })
      .then(() => {
        this.setState({
            open: false,
          });
          this.props.getResourceTags();
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

  updateSearchField = (value: string) => {
    this.setState({
      searchField: value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Chip
          label={"Add Tag"}
          size="small"
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
          <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
          <Button onClick={this.handleClose} size="large" color="primary" startIcon={<CancelIcon />} >
          </Button>
          </div>
          <DialogContent>
            <DialogContentText>
              To add a new tag, start typing your search below to select one.
            </DialogContentText>
          </DialogContent>
          <div style={{ width: 300 }}>
            <Autocomplete
              className={classes.search}
              disableClearable
              inputValue={this.state.searchField}
              onInputChange={(event, newInputValue) => {
                this.updateSearchField(newInputValue);
              }}
              options={this.state.tagArray.map(
                (tag: TagArray) => tag.skillName
              )}
              renderInput={(params) => (
                <TextField
                  //   value={this.state.searchField}
                  //   onChange={(e) => this.setState({searchField: e.target.value})}
                  {...params}
                  label="Search Skills"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </div>
          <DialogActions>
            <Button onClick={this.addNewTag} color="primary" variant="contained" startIcon={<SaveIcon />}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewResourceTag);
