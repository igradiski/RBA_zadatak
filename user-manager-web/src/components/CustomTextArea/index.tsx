import React from 'react';
import { createStyles, Textarea } from '@mantine/core';
import themeColors from '../../theme';
import { FieldError } from 'react-hook-form';

type CustomTextAreaProps = {
  onChange: () => void;
  value: string;
  label?: string;
  error?: FieldError | undefined;
};
export const CustomTextArea = (props: CustomTextAreaProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Textarea
        classNames={{
          root: classes.width,
          input: props.error ? classes.inputError : classes.input,
          wrapper: classes.wrapper2,
          //defaultVariant: classes.defvar,
          description: classes.defvar,
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
    height: '15vh',
    flexDirection: 'column',
    boxShadow:
      'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(30, 30, 30, 1)',
    borderWidth: 1,
    position: 'relative',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  wrapper2: {
    height: '15vh',
  },
  width: {
    width: '100%',
    height: '15vh',
  },
  defvar: {
    width: '100%',
    height: '15vh',
  },
  input: {
    height: '15vh',
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
    '&::-webkit-scrollbar': { visibility: 'hidden' },
    '&::-webkit-scrollbar-track': {
      visibility: 'hidden',
    },
    '&::-webkit-scrollbar-thumb': {
      visibility: 'hidden',
    },
  },
  inputError: {
    height: '15vh',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderColor: 'red',
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
    display: 'flex',
    position: 'absolute',
    left: 20,
    bottom: 30,
    color: themeColors.theme.colors.black,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
}));
