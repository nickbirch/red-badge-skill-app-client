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
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CancelIcon from '@material-ui/icons/Cancel';


interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string,
  baseURL: string,
  updateTitle(e: React.ChangeEvent<HTMLInputElement>): void,
  updateDescription(e: React.ChangeEvent<HTMLInputElement>): void,
  updateType(e: React.ChangeEvent<{ value: unknown }>): void,
  handleClose(): void,
  getResources(): void,
  currentState: {
    id: number,
    title: string,
    description: string,                    
    type: string,
    editOpen: boolean;
  }
}

interface IState {

}

const styles = (theme: Theme) =>
  createStyles({
    flex: {
        justifyContent: 'space-between',
        display: "flex",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: '#fff !important',
      },
    formField: {
        color: '#fff !important',
        margin: '0.75rem 1rem',
        width: '90%'
    },
    selectField: {
        color: '#fff !important',
        margin: '0.75rem 1rem',
        width: '30%'
    },
  });

export class EditResource extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {

    };
  }

  updateResource = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let url: string = `${this.props.baseURL}resource/update/${this.props.currentState.id}`;
    let resourceObject = {
        title: this.props.currentState.title,
        description: this.props.currentState.description,
        type: this.props.currentState.type,
    };

    fetch(url, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
      body: JSON.stringify({ resource: resourceObject }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then(() => {
        this.props.handleClose();
        this.props.getResources();
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
          open={this.props.currentState.editOpen}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
            <div className={classes.flex}>
                <DialogTitle id="form-dialog-title" >
                    Edit Resource
                </DialogTitle>
                <Button onClick={this.props.handleClose} size="large" color="primary" startIcon={<CancelIcon />} >
                </Button>
            </div>
          <DialogContent>
            <DialogContentText color="secondary">
              <em>Note: This will edit the resource for everyone so be mindful!</em>
            </DialogContentText>
          </DialogContent>
          <form className={classes.form} noValidate onSubmit={this.updateResource}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  className={classes.formField}
                  value={this.props.currentState.title} 
                  onChange={this.props.updateTitle}
                />
                <TextField
                  variant="outlined"
                  multiline
                  required
                  margin="normal"
                  name="description"
                  label="Description"
                  id="description"
                  autoComplete="description"
                  value={this.props.currentState.description} 
                  onChange={this.props.updateDescription}
                  className={classes.formField}
                />
                <FormControl required className={classes.selectField}>
                <InputLabel>Type</InputLabel>
                <Select
                value={this.props.currentState.type}
                onChange={(e) => this.props.updateType(e)}
                >
                <MenuItem value="" disabled>
                    Type
                </MenuItem>
                <MenuItem value={'Forum'}>Forum</MenuItem>
                <MenuItem value={'Tutorial'}>Tutorial</MenuItem>
                <MenuItem value={'Blog'}>Blog</MenuItem>
                <MenuItem value={'Code Example'}>Code Example</MenuItem>
                <MenuItem value={'Documentation'}>Documentation</MenuItem>
                </Select>
            </FormControl>  
          <DialogActions>
            <Button variant="contained" type="submit" color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
          </DialogActions>
            </form>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(EditResource);
