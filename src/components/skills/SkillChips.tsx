import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NewSkill from './NewSkill';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { SkillArray } from '../../types';


interface AcceptedProps {
    skillArray: SkillArray[];
    baseURL: string;
    updateActiveSkill(activeSkill: SkillArray): void;
    updateActiveTag(tagToShow: SkillArray): void;
    userToken: string;
    handleEditClick(arg: boolean): void;
    updateSkillArray(skillArray: SkillArray[]): void;
    activeTagName: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
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
    chipNotLearning: {
        margin: theme.spacing(0.5),
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
        color: "#000",
        textTransform: "uppercase",
      },
    chipClicked: {
      border: '0.2rem #00C102 solid',
    },
  }),
);

const SkillChips: React.FunctionComponent<AcceptedProps> = (props) => {
  const classes = useStyles();

  const handleEdit = (skillToEdit: SkillArray) => {
    props.updateActiveSkill(skillToEdit)
    props.handleEditClick(true)
  };

  const handleClick = (tagToShow: SkillArray) =>  {
    props.updateActiveTag(tagToShow)
  };

  return (
    <ul className={classes.root}>
      {props.skillArray.map((skill: SkillArray, index) => {

        let checkIfActive;
        let clicked;

        if (skill.activeLearning  === true) {
            checkIfActive = classes.chip
        } else {
            checkIfActive = classes.chipNotLearning
        }

        if (skill.tag.skillName === props.activeTagName) {
            clicked = classes.chipClicked
        }

        return (
          <li key={index}>
            <Chip
              label={skill.tag.skillName}
              onDelete={() => handleEdit(skill)}
              onClick={() => handleClick(skill)}
              className={`${checkIfActive} ${clicked}`}
              deleteIcon={<EditIcon />}
            />
          </li>
        );
      })}
      <NewSkill userToken={props.userToken} baseURL={props.baseURL} updateSkillArray={props.updateSkillArray} />
      </ul>
);
}

export default SkillChips;