import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { SkillArray } from "../../types";

interface AcceptedProps {
  userSkills: SkillArray[];
  open: boolean;
  handleClose(): void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(2),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
      background:
        "linear-gradient(147.85deg, #00BFC7 11.75%, rgba(39, 72, 241, 0.9) 86.71%)",
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      color: "#fff",
      textTransform: "uppercase",
    },
    chipNotLearning: {
      margin: theme.spacing(0.5),
      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
      color: "#000",
      textTransform: "uppercase",
    },
    flex: {
      justifyContent: "space-between",
      display: "flex",
    },
    text: {
      padding: '1rem',  
    },
  })
);

const ViewUserSkills: React.FunctionComponent<AcceptedProps> = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
    >
      <div className={classes.flex}>
        <DialogTitle id="form-dialog-title">Current Skills</DialogTitle>
        <Button
          onClick={props.handleClose}
          size="large"
          color="primary"
          startIcon={<CancelIcon />}
        ></Button>
      </div>
      {props.userSkills.length > 0 ? (
        <ul className={classes.root}>
          {props.userSkills.map((skill: SkillArray, index) => {
            let checkIfActive;

            if (skill.activeLearning === true) {
              checkIfActive = classes.chip;
            } else {
              checkIfActive = classes.chipNotLearning;
            }

            return (
              <li key={index}>
                <Chip label={skill.tag.skillName} className={checkIfActive} />
              </li>
            );
          })}
        </ul>
      ) : (
        <Typography className={classes.text} >User hasn't added any skills yet.</Typography>
      )}
    </Dialog>
  );
};

export default ViewUserSkills;
