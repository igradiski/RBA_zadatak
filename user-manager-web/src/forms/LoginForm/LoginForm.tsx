import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { createStyles } from '@mantine/core';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from 'antd';
import { CustomInput } from '../../components/Input';
import { CustomPasswordInput } from '../../components/PasswordInput';
import { CustomButtonConfirm } from '../../components/FormButton';
import { UserData } from '../../types/userTypes';
import { handleUserLogin } from '../../store/user';

export const LoginForm: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const loginFormSchema = object().shape({
    username: string().required().min(3),
    password: string().required().min(3),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  function errorModal() {
    Modal.error({
      title: t('loginScreen.modalFailTitle'),
      content: t('loginScreen.modalFail'),
    });
  }

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin: SubmitHandler<UserData> = async data => {
    await dispatch(handleUserLogin(data))
      .unwrap()
      .then(() => {
        navigate('/userManagement');
      })
      .catch((reason: any) => {
        errorModal();
      });
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.loginBorder}>
        <div className={classes.headerContainer}>
          <h1>{t('loginScreen.title')}</h1>
        </div>
        <div className={classes.formContainer}>
          <Controller
            control={control}
            name="username"
            shouldUnregister={true}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                value={value}
                onChange={onChange}
                label={t('loginScreen.username')}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            shouldUnregister={true}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomPasswordInput
                value={value}
                onChange={onChange}
                label={t('loginScreen.password')}
              />
            )}
          />
          <CustomButtonConfirm
            text={t('loginScreen.title')}
            isValid={isValid}
            submit={handleSubmit(handleLogin)}
          />
          <div className={classes.registerContainer}>
            <span>
              {/* <span
                onClick={() => navigate("resetPassword")}
                className={classes.linkText}
              >
                {t("loginScreen.forgottenPassword")}
              </span>
              <br></br> */}
              <span
                onClick={() => navigate('/register')}
                className={classes.linkText}>
                {t('loginScreen.toRegister')}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const useStyles = createStyles(theme => ({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBorder: {
    boxShadow:
      ' inset -5px -5px 9px rgba(35, 51, 41, 1), inset 5px 5px 9px rgba(35, 51, 41, 1)',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    width: '30%',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '30%',
  },
  headerText: {
    fontSize: 35,
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '100px',
  },
  input: {
    width: '500px',
  },
  registerContainer: {
    marginTop: 20,
    width: '100%',
    textAlign: 'center',
  },
  registerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    fontWeight: 700,
  },
  linkText: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    width: '50%',
    '&:hover': {
      cursor: 'pointer',
      //boxShadow: "0px 15px 20px " + themeColors.theme.colors.lightGreen,
      color: 'white',
      transform: 'translateY(-7px)',
    },
  },
  imgLogo: {
    '@media (max-width: 1200px)': {
      width: '60%',
      height: '60%',
      minWidth: '100px',
      minHeight: '100px',
    },
  },
}));
