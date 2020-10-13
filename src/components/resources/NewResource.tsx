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
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
// const getTitleAtUrl = require('get-title-at-url');

interface AcceptedProps extends WithStyles<typeof styles> {
  userToken: string,
  baseURL: string,
  activeTagId: number | null,
  getResources(): void,
}


interface IState {
    title: string,
    description: string,
    type: string,
    link: string,
    open: boolean,
}

const styles = (theme: Theme) =>
  createStyles({
    resourceCard: {
        minWidth: 275,
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
        background:
          "linear-gradient(90deg, rgba(44, 44, 44, 0.81) 0%, rgba(44, 44, 44, 0.962647) 80.34%, #2C2C2C 100%)",
        borderRadius: "1.75rem",
        margin: "1rem",
        flexGrow: 1,
      },
      flex: {
        justifyContent: 'space-between',
        display: "flex",
      },
      header: {
        background: "linear-gradient(147.85deg, #00C102 11.75%, #00C102 86.71%)",
        color: theme.palette.primary.contrastText,
        fontSize: "1.25rem",
        textDecoration: "none",
        cursor: 'pointer'
      },
      title: {
        textAlign: "left",
        color: theme.palette.primary.contrastText,
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

export class NewResource extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
        title: '',
        description: '',
        type: '',
        link: '',
        open: false,
    };
  }


  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  updateLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      link: e.target.value,
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

//   componentDidUpdate(prevState: any) {
//       if (prevState.link !== this.state.link && this.state.link !== '') {
//         getTitleAtUrl(this.state.link, function(title: string){
//             console.log(title);
//           });
//      } 
//     }


  addResource = (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();
    let url: string = `${this.props.baseURL}resource/add`;
    let reqObject = {
        resource: 
        {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            link: this.state.link
        },
        skill: {
            id: this.props.activeTagId
        }
    };
    
    fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.userToken,
      }),
      body: JSON.stringify( reqObject ),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res.status;
        }
      })
      .then(() => {
          this.handleClose();
          this.props.getResources();
      })
      .catch((err) => {
        console.log(err);
      });

  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Card className={classes.resourceCard} onClick={this.handleClickOpen}>
            <CardHeader className={classes.header} title={"Add Resource"}  />
          </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
            <div className={classes.flex}>
          <DialogTitle id="form-dialog-title">Add Resource</DialogTitle>
          <Button onClick={this.handleClose} size="large" color="primary" startIcon={<CancelIcon />} >
          </Button>
          </div>
          <form className={classes.form} noValidate onSubmit={this.addResource}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="link"
                  label="Link"
                  name="link"
                  autoComplete="link"
                  autoFocus
                  className={classes.formField}
                  value={this.state.link} 
                  onChange={this.updateLink}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  className={classes.formField}
                  value={this.state.title} 
                  onChange={this.updateTitle}
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
                  value={this.state.description} 
                  onChange={this.updateDescription}
                  className={classes.formField}
                />
                <FormControl required className={classes.selectField}>
                <InputLabel>Type</InputLabel>
                <Select
                value={this.state.type}
                onChange={(e) => this.updateType(e)}
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

export default withStyles(styles, { withTheme: true })(NewResource);
