import { createStyles } from '@mantine/core';
import { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PersonData } from '../../types/PersonTypes';
import themeColors from '../../theme';
import { CustomButtonConfirm } from '../FormButton';
import { useAppDispatch } from '../../store';
import { addCardThunk } from '../../store/card';
import { Modal } from 'antd';
import { fetchPersonByOibThunk } from '../../store/person';

type InputProps = {
  person?: PersonData;
};

export const PersonDataComponent = (props: InputProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('re render');
  }, [props.person]);

  function successModal() {
    Modal.success({
      title: t('personDataComponent.modalCard.sucessTitle'),
      content: t('personDataComponent.modalCard.successContent'),
    });
  }
  function errorModal() {
    Modal.error({
      title: t('personDataComponent.modalCard.errorTitle'),
      content: t('personDataComponent.modalCard.errorContent'),
    });
  }

  const createPersonCard = async () => {
    console.log(props.person);
    if (props.person) {
      await dispatch(addCardThunk(props.person))
        .unwrap()
        .then(() => {
          //fetch i refresh
          dispatch(fetchPersonByOibThunk(props.person?.OIB!));
          successModal();
        })
        .catch((reason: any) => {
          console.log(reason);
          errorModal();
        });
    } else {
    }
  };
  return (
    <div className={classes.mainContainer}>
      <div className={classes.leftContainer}>
        <span className={classes.textStyle}>
          {t('personDataComponent.name')}: {props.person?.name}
        </span>
        <span className={classes.textStyle}>
          {t('personDataComponent.lastName')}: {props.person?.lastName}
        </span>
        <span className={classes.textStyle}>
          {t('personDataComponent.OIB')}: {props.person?.OIB}
        </span>
        <span className={classes.textStyle}>
          {t('personDataComponent.status')}: {props.person?.status}
        </span>
      </div>
      <div className={classes.rightContainer}>
        <CustomButtonConfirm
          text={t('personDataComponent.createCard')}
          styleValid={classes.buttonStyleSearchDelete}
          styleInvalid={classes.buttonStyleSearchDelete}
          isValid={
            props.person !== null &&
            props.person !== undefined &&
            Object.keys(props.person).length > 0
              ? true
              : false
          }
          submit={createPersonCard}
        />
      </div>
    </div>
  );
};

const useStyles = createStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: themeColors.sizes.padding,
    display: 'flex',
    flexDirection: 'row',
  },
  leftContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  rightContainer: {
    display: 'flex',
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: themeColors.theme.colors.white,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 700,
  },
  buttonStyleSearchDelete: {
    height: 40,
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.white,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontSize: 16,
    boxShadow: '0 0 0 0',
    border: '1px solid black ',
    marginRight: '20px',
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: 'transparent',
      color: themeColors.theme.colors.white,
      fontWeight: 500,
      fontFamily: 'Roboto',
      minWidth: '150px',
    },
  },
  buttonStyleSearchDeleteInvalid: {
    height: 40,
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.white,
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontSize: 16,
    boxShadow: '0 0 0 0',
    border: '1px solid black ',
    marginRight: '20px',
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: 'transparent',
      color: themeColors.theme.colors.white,
      fontWeight: 500,
      fontFamily: 'Roboto',
      minWidth: '150px',
    },
  },
}));
