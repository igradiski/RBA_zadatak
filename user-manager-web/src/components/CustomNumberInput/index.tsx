import { NumberInput, createStyles } from '@mantine/core';
import { FieldError } from 'react-hook-form';
import themeColors from '../../theme';

type InputProps = {
  onChange: () => void;
  value: number;
  label?: string;
  error?: FieldError | undefined;
  onBlur?: () => void;
  showRightSection?: boolean;
  righSectionContent?: string;
};

export const CustomNumberInput = (props: InputProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <NumberInput
        classNames={{
          root: classes.width,
          input: props.error ? classes.inputError : classes.input,
          rightSection: props.showRightSection
            ? classes.rightSection
            : undefined,
        }}
        placeholder={props.label}
        value={props.value > 0 ? props.value : undefined}
        onChange={props.onChange}
        onBlur={props?.onBlur}
        decimalSeparator=","
        precision={3}
        rightSection={
          props.showRightSection ? (
            <div className={classes.rightSection}>
              {props.righSectionContent}
            </div>
          ) : null
        }
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
    boxShadow:
      'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(30, 30, 30, 1)',
    borderWidth: 1,
    position: 'relative',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  width: {
    width: '100%',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    fontFamily: 'Roboto',
    fontSize: 16,
    width: '50%',
    fontWeight: 700,
    marginRight: '5px',
    color: themeColors.theme.colors.black,
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
  inputError: {
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
