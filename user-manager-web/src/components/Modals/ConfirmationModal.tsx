import { Modal, Button } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { FunctionComponent, useState, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import themeColors from '../../theme';

type Props = {
  visible: boolean;
  title: string;
  content: string;
  id: string;
  onOk: (id: string) => void;
  onCancel: () => void;
  okText: string;
  cancelText: string;
};

const ConfirmationModal: FunctionComponent<Props> = ({
  onOk,
  onCancel,
  title,
  content,
  visible,
  id,
  okText,
  cancelText,
}) => {
  const { classes } = useStyles();
  return (
    <Modal
      opened={visible}
      onClose={onCancel}
      title={title}
      classNames={{
        root: classes.root,
        body: classes.body,
        header: classes.header,
        inner: classes.inner,
        //modal: classes.modal,
        title: classes.title,
      }}>
      <div>
        <p className={classes.content}>{content}</p>
        <div className={classes.buttonsContainer}>
          <Button className={classes.buttonOK} onClick={() => onOk(id)}>
            {okText}
          </Button>
          <Button className={classes.buttonCancel} onClick={onCancel}>
            {cancelText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const useStyles = createStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'transparent',
  },
  inner: {},
  title: { fontWeight: 700, fontFamily: 'Roboto', fontSize: 25 },
  content: { fontWeight: 500, fontFamily: 'Roboto', fontSize: 18 },
  modal: {
    backgroundColor: themeColors.theme.colors.white,
  },
  buttonsContainer: {
    marginTop: '2em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonOK: {
    width: '35%',
    height: 40,
    backgroundColor: themeColors.theme.colors.forest,
    color: themeColors.theme.colors.white,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '100px',
    boxShadow:
      'inset -5px -5px 9px black, inset 5px 5px 9px rgba(94,104,121,0.3)',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: themeColors.theme.colors.forest,
      boxShadow:
        ' inset -5px -5px 9px rgba(94,104,121,0.3), inset 5px 5px 9px black',
      transform: 'translateY(-7px)',
    },
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: themeColors.theme.colors.forest,
      color: themeColors.theme.colors.white,
      fontWeight: 700,
      fontFamily: 'Roboto',
      fontSize: 12,
      borderRadius: 10,
      minWidth: '150px',
    },
  },
  buttonCancel: {
    width: '35%',
    height: 40,
    backgroundColor: themeColors.theme.colors.colorRed,
    color: themeColors.theme.colors.white,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '100px',
    boxShadow:
      'inset -5px -5px 9px black, inset 5px 5px 9px rgba(94,104,121,0.3)',
    borderRadius: 10,
    '&:hover': {
      backgroundColor: themeColors.theme.colors.colorRed,
      boxShadow:
        ' inset -5px -5px 9px rgba(94,104,121,0.3), inset 5px 5px 9px black',
      transform: 'translateY(-7px)',
    },
    '@media (max-width: 1200px)': {
      width: '35%',
      height: 50,
      backgroundColor: themeColors.theme.colors.colorRed,
      color: themeColors.theme.colors.white,
      fontWeight: 700,
      fontFamily: 'Roboto',
      fontSize: 12,
      borderRadius: 10,
      minWidth: '150px',
    },
  },
}));

export default ConfirmationModal;
