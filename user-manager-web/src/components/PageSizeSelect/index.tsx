import { Select, createStyles } from '@mantine/core';
import themeColors from '../../theme';

type SelectProps = {
  handlePageSizeChange: (page: string) => void;
};

export const PageSizeSelect = (props: SelectProps) => {
  const { classes } = useStyles();
  return (
    <Select
      classNames={{
        dropdown: classes.dropdown,
        wrapper: classes.dropdown,
        item: classes.item,
        input: classes.input,
        label: classes.label,
        // selected: classes.selected,
        nothingFound: classes.borderNone,
      }}
      defaultValue={'5'}
      onChange={props.handlePageSizeChange}
      data={[
        { value: '3', label: '3' },
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
      ]}
    />
  );
};

const useStyles = createStyles(theme => ({
  dropdown: {
    width: '70px',
    background: 'transparent',
    border: `1px solid ${themeColors.theme.colors.forest}`,
    borderRadius: '10px',
  },
  item: {
    background: 'transparent',
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: themeColors.theme.colors.greenGradientLight,
      color: themeColors.theme.colors.black,
    },
  },
  input: {
    background: 'transparent',
    border: `none`,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 500,
  },
  selected: {
    backgroundColor: themeColors.theme.colors.forest,
    border: `1px solid ${themeColors.theme.colors.forest}`,
    color: 'white',
  },
  borderNone: {
    border: `1px solid ${themeColors.theme.colors.forest}`,
    backgroundColor: 'red',
  },
}));
