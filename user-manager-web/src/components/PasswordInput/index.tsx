import React from 'react';
import { createStyles, PasswordInput, TextInput } from '@mantine/core';
import themeColors from '../../theme';

type InputProps = {
  onChange: () => void;
  value: string;
  label?: string;
};
export const CustomPasswordInput = (props: InputProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <PasswordInput
        classNames={{
          root: classes.width,
          input: classes.input,
          innerInput: classes.input,
        }}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

const useStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    width: '100%',
    marginBottom: 30,
    height: 40,
    flexDirection: 'column',
    //borderColor: themeColors.theme.colors.black,
    //borderStyle: "solid",
    //borderWidth: 1,
    boxShadow:
      ' inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(30, 30, 30, 1)',
    position: 'relative',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  width: {
    width: '100%',
  },
  input: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: '2px',
    textAlign: 'center',
    color: themeColors.theme.colors.black,
    '::placeholder': {
      color: themeColors.theme.colors.grey,
      fontSize: 16,
      fontWeight: 600,
    },
  },
  labelStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    display: 'flex',
    position: 'absolute',
    left: 20,
    bottom: 5,
    color: themeColors.theme.colors.black,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
}));
