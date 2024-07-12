import { FieldError } from 'react-hook-form';
import themeColors from '../../theme';
import { MultiSelect, SelectItem, createStyles } from '@mantine/core';

type InputProps = {
  onChange: () => void;
  value: any;
  label?: string;
  error?: FieldError | undefined;
  data?: any[];
};

export const CustomMultiSelect = (props: InputProps) => {
  const { classes } = useStyles();

  const parseData = (data: any[] | undefined) => {
    if (data != undefined) {
      return data.map((value: any) => {
        var item: SelectItem = {
          value: value,
          label: value,
        };
        return item;
      });
    } else {
      return [];
    }
  };
  return (
    <div className={classes.wrapper}>
      <MultiSelect
        classNames={{
          root: classes.width,
          input: classes.input,
          dropdown: classes.dropdown,
          item: classes.option,
          value: classes.pill,
          defaultValueRemove: classes.Xbutton,
          //hovered: classes.selectHover,
          searchInput: classes.placeholderText,
          wrapper: classes.placeholderText,
        }}
        placeholder={props.label}
        data={parseData(props.data)}
        onChange={props.onChange}
        value={props.value}
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
  },
  option: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 700,
    color: themeColors.theme.colors.black,
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
