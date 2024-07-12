import { Button, createStyles } from '@mantine/core';
import themeColors from '../../theme';

type InputProps = {
  isValid: boolean;
  submit: () => void;
  text: string;
  styleValid?: any;
  styleInvalid?: any;
};
export const CustomButtonConfirm = (props: InputProps) => {
  const { classes } = useStyles();
  return (
    <Button
      classNames={{
        inner: classes.text,
        label: classes.text,
      }}
      className={
        props.isValid
          ? `${classes.buttonValid} ${props.styleValid}`
          : `${classes.buttonInvalid} ${props.styleInvalid}`
      }
      onClick={props.submit}>
      {props.text}
    </Button>
  );
};

const useStyles = createStyles(() => ({
  text: {
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    textAlign: 'center',
    whiteSpace: 'normal',
  },
  buttonValid: {
    width: '35%',
    height: 50,
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.black,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '150px',
    boxShadow:
      'inset -5px -5px 9px black, inset 5px 5px 9px rgba(94,104,121,0.3)',
    borderRadius: 20,
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow:
        ' inset -5px -5px 9px rgba(94,104,121,0.3), inset 5px 5px 9px black',
      transform: 'translateY(-7px)',
    },
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: 'transparent',
      color: themeColors.theme.colors.black,
      fontWeight: 700,
      fontFamily: 'Roboto',
      fontSize: 12,
      borderRadius: 10,
      minWidth: '150px',
    },
  },
  buttonInvalid: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
    width: '35%',
    height: 50,
    opacity: 0.3,
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.black,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '150px',
    boxShadow:
      'inset -5px -5px 9px black, inset 5px 5px 9px rgba(94,104,121,0.3)',
    borderRadius: 20,
    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow:
        ' inset -5px -5px 9px rgba(94,104,121,0.3), inset 5px 5px 9px black',
    },
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: 'transparent',
      color: themeColors.theme.colors.black,
      fontWeight: 700,
      fontFamily: 'Roboto',
      minWidth: '150px',
    },
  },
}));
