import { createStyles } from '@mantine/core';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from 'antd';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CustomInput } from '../../components/Input';
import { CustomButtonConfirm } from '../../components/FormButton';
import themeColors from '../../theme';
import React from 'react';
import { PersonData } from '../../types/PersonTypes';
import { addPersonThunk } from '../../store/person';

type Props = {
  visible: boolean;
  onCancel: () => void;
};

export const PersonModal: FunctionComponent<Props> = ({
  visible,
  onCancel,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const personSchema = object().shape({
    name: string().required().min(3),
    lastName: string().required().min(3),
    OIB: string().required().min(11).max(11),
  });

  const defaultValues = {
    name: '',
    lastName: '',
    OIB: '',
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(personSchema),
  });

  //todo
  function errorModal() {
    Modal.error({
      title: t('userManagementScreen.modal.insertErrorTitle'),
      content: t('userManagementScreen.modal.insertErrorContent'),
    });
  }
  //todo
  function successModal() {
    Modal.success({
      title: t('userManagementScreen.modal.insertSuccessfullTitle'),
      content: t('userManagementScreen.modal.insertSuccessfullContent'),
    });
  }

  const handlePersonInsert: SubmitHandler<PersonData> = async data => {
    await dispatch(addPersonThunk(data))
      .unwrap()
      .then(() => {
        //fetch i refresh
        successModal();
        reset();
      })
      .catch((reason: any) => {
        console.log(reason);
        errorModal();
      });
  };
  return (
    <Modal
      open={visible}
      onClose={onCancel}
      onCancel={onCancel}
      footer={null}
      style={{ borderRadius: 0, padding: 0 }}
      classNames={{
        body: classes.body,
        content: classes.content,
      }}>
      <div className={classes.modalContainer}>
        <div className={classes.formContainer}>
          <h2>{t('userManagementScreen.modal.title')}</h2>
          <Controller
            control={control}
            name="name"
            shouldUnregister={true}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                value={value}
                onChange={onChange}
                label={t('userManagementScreen.modal.name')}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            shouldUnregister={true}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                value={value}
                onChange={onChange}
                label={t('userManagementScreen.modal.lastName')}
              />
            )}
          />
          <Controller
            control={control}
            name="OIB"
            shouldUnregister={true}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                value={value}
                onChange={onChange}
                label={t('userManagementScreen.modal.OIB')}
              />
            )}
          />

          <CustomButtonConfirm
            text={t('common.save')}
            styleValid={classes.buttonStyle}
            isValid={isValid}
            submit={handleSubmit(handlePersonInsert)}
          />
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createStyles(theme => ({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  body: {
    background: `linear-gradient(135deg, ${theme.colors.indigo[6]}, ${theme.colors.cyan[4]})`,
    padding: '0px',
    border: '2px solid black',
    borderRadius: 20,
  },
  content: {
    padding: '0px!important',
    margin: '0px',
    backgroundColor: 'transparent!important',
  },
  buttonStyle: {},
}));
