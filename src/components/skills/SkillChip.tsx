import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { SkillArray } from '../../types';


interface AcceptedProps {
    skills: SkillArray[];
    updateActiveSkillId(tagToShow: SkillArray): void;
    userToken: string;
    baseURL: string;
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
      color: "#fff"
    },
    chipNotLearning: {
        margin: theme.spacing(0.5),
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.5)",
        color: "#000"
      },
  }),
);

const SkillChip: React.FunctionComponent<AcceptedProps> = (props) => {
  const classes = useStyles();

//   const handleDelete = (chipToDelete: ChipData) => () => {
//     setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
//   };

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
      </ul>
);
}

export default SkillChip;