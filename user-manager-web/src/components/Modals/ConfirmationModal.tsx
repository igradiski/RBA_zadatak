import { Modal, Button, createStyles } from '@mantine/core';
import { FunctionComponent } from 'react';
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
      style={{ borderRadius: 0, padding: 0 }}
      classNames={{
        body: classes.body,
        content: classes.content,
        header: classes.header,
        close: classes.header,
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
    backgroundColor: theme.colors.indigo[6],
  },
  body: {
    backgroundColor: theme.colors.indigo[6],
  },
  header: {
    backgroundColor: theme.colors.indigo[6],
  },
  inner: {},
  title: { fontWeight: 700, fontFamily: 'Roboto', fontSize: 25 },
  content: {
    fontWeight: 500,
    fontFamily: 'Roboto',
    fontSize: 18,
    backgroundColor: theme.colors.indigo[6],
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
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.white,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '100px',
    boxShadow: '0 0 0 0',
    border: '1px solid black ',
  },
  buttonCancel: {
    width: '35%',
    height: 40,
    backgroundColor: 'transparent',
    color: themeColors.theme.colors.white,
    fontWeight: 700,
    fontFamily: 'Roboto',
    fontSize: 20,
    minWidth: '100px',
    boxShadow: '0 0 0 0',
    border: '1px solid red ',
  },
}));

export default ConfirmationModal;
