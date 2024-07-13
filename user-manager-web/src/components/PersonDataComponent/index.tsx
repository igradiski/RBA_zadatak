import { createStyles } from '@mantine/core';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonData } from '../../types/PersonTypes';
import themeColors from '../../theme';

type InputProps = {
  person?: PersonData;
};

export const PersonDataComponent = (props: InputProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <div className={classes.mainContainer}>
      <p className={classes.textStyle}>
        {t('personDataComponent.name')}: {props.person?.name}
      </p>
      <p className={classes.textStyle}>
        {t('personDataComponent.lastName')}: {props.person?.lastName}
      </p>
      <p className={classes.textStyle}>
        {t('personDataComponent.OIB')}: {props.person?.OIB}
      </p>
      <p className={classes.textStyle}>
        {t('personDataComponent.status')}: {props.person?.status}
      </p>
    </div>
  );
};

const useStyles = createStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: themeColors.sizes.padding,
  },
  textStyle: {
    color: themeColors.theme.colors.white,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 700,
  },
}));
