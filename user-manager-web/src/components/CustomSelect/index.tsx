import { FieldError } from 'react-hook-form';
import themeColors from '../../theme';
import { Select, SelectItem, createStyles } from '@mantine/core';

type InputProps = {
  onChange: () => void;
  handleChange?: () => void;
  value: string;
  label?: string;
  error?: FieldError | undefined;
  data: SelectItem[] | string[];
  searchable: boolean;
  name?: string;
};

export const CustomSelect = (props: InputProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Select
        classNames={{
          root: classes.width,
          input: classes.input,
          dropdown: classes.dropdown,
          item: classes.option,
          //hovered: classes.selectHover,
          wrapper: classes.placeholderText,
        }}
        name={props.name}
        onChange={props.onChange}
        placeholder={props.label}
        data={props.data}
        value={props.value}
        searchable={true}
        nothingFound={'Neeema'}
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
    color: 'black!important',
  },
  labelText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    color: themeColors.theme.colors.black,
  },
  dropdown: {
    backgroundColor: themeColors.theme.colors.forest,
    border: '1px solid black',
    color: 'black',
    '::placeholder': {
      color: themeColors.theme.colors.grey,
    },
  },
  option: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    color: themeColors.theme.colors.black,
    '::placeholder': {
      color: themeColors.theme.colors.grey,
    },
  },
  width: {
    width: '100%',
    color: 'black',
  },
  placeholderText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    textAlign: 'center',
    '::placeholder': {
      color: themeColors.theme.colors.grey,
    },
  },
  pill: {
    backgroundColor: 'transparent',
    border: '1px solid black',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    color: themeColors.theme.colors.black,
  },
  selectHover: {
    backgroundColor: themeColors.theme.colors.lightGreen,
    color: 'black',
  },
  Xbutton: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
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
