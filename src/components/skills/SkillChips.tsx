import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NewSkill from './NewSkill';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { SkillArray } from '../../types';


interface AcceptedProps {
    skills: SkillArray[];
    baseURL: string;
    updateActiveSkillId(tagToShow: SkillArray): void;
    userToken: string;
    getSkills(): void;
    handleEditClick(arg: boolean): void;
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
  }),
);

const SkillChips: React.FunctionComponent<AcceptedProps> = (props) => {
  const classes = useStyles();

  const handleEdit = (skillToEdit: SkillArray) => {
    props.updateActiveSkillId(skillToEdit)
    props.handleEditClick(true)
  };

  const handleClick = (tagToShow: SkillArray) =>  {
    props.updateActiveSkillId(tagToShow)
  };

  return (
    <ul className={classes.root}>
      {props.skills.map((skill: SkillArray, index) => {

        let checkIfActive;

        if (skill.activeLearning  === true) {
            checkIfActive = classes.chip
        } else {
            checkIfActive = classes.chipNotLearning
        }

        return (
          <li key={index}>
            <Chip
              label={skill.tag.skillName}
              onDelete={() => handleEdit(skill)}
              onClick={() => handleClick(skill)}
              className={checkIfActive}
              deleteIcon={<EditIcon />}
            />
          </li>
        );
      })}
      <NewSkill userToken={props.userToken} baseURL={props.baseURL} getSkills={props.getSkills} />
      </ul>
);
}

export default SkillChips;