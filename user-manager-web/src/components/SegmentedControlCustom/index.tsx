import {
  createStyles,
  SegmentedControl,
  SegmentedControlItem,
} from '@mantine/core';
import themeColors from '../../theme';

type InputProps = {
  onChange: (value: string) => void;
  data: SegmentedControlItem[];
  value: any;
};

export const SegmentedControlCustom = (props: InputProps) => {
  const { classes } = useStyles();
  return (
    <SegmentedControl
      onChange={props.onChange}
      transitionDuration={800}
      value={props.value}
      classNames={{
        root: classes.root,
        label: classes.label,
        controlActive: classes.controlActive,
        control: classes.control,
        //labelActive: classes.labelActive,
        //active: classes.active,
      }}
      data={props.data}
    />
  );
};

const useStyles = createStyles(() => ({
  active: {
    backgroundColor: themeColors.theme.colors.forest,
  },
  root: {
    backgroundColor: themeColors.theme.colors.charcoal,
    borderColor: themeColors.theme.colors.forest,
    borderWidth: '2px',
    borderStyle: 'solid',
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  labelActive: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  controlActive: {
    backgroundColor: themeColors.theme.colors.forest,
    margin: '2px',
    borderRadius: '2px',
  },
  control: {
    margin: '2px',
    borderRadius: '2px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: themeColors.theme.colors.forest,
    },
  },
}));
