import { createStyles } from '@mantine/core';
import React from 'react';
import themeColors from '../../theme';
import { Trash, EditCircle } from 'tabler-icons-react';

type CrudButtonsProps = {
  id: string;
  deleteFunction?: (id: string) => void;
  updateFunction?: (id: string) => void;
  lastRow: boolean;
};

export const CrudButtons = (props: CrudButtonsProps) => {
  const { classes } = useStyles();
  return (
    <th
      style={{
        borderBottomRightRadius: props.lastRow ? '15px' : '0px',
      }}>
      <div className={classes.mainContainer}>
        <div
          onClick={() => {
            if (props.updateFunction) {
              props.updateFunction(props.id);
            }
          }}
          className={classes.buttonContainer}>
          <EditCircle size={20} />
        </div>
        <div
          onClick={() => {
            if (props.deleteFunction) {
              props.deleteFunction(props.id);
            }
          }}
          className={classes.buttonContainer}>
          <Trash size={20} />
        </div>
      </div>
    </th>
  );
};

const useStyles = createStyles(theme => ({
  mainContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    padding: '2px',
  },
  buttonContainer: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: themeColors.theme.colors.black,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: '5px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'transparent',
      boxShadow:
        ' inset -5px -5px 9px rgba(94,104,121,0.3), inset 5px 5px 9px black',
      transform: 'translateY(-7px)',
    },
  },
}));
