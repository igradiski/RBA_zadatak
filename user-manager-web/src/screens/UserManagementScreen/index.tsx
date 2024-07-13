import { createStyles } from '@mantine/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootState, useAppDispatch } from '../../store';
import themeColors from '../../theme';
import { CustomTable } from '../../components/Table';
import { CustomCellType } from '../../types/CustomCellType';
import { CustomButtonConfirm } from '../../components/FormButton';
import { PersonModal } from './insertModal';
import { PageableSpring } from '../../types/Pageable';
import { fetchPersonByOibThunk, fetchPersonsThunk } from '../../store/person';
import { PersonData } from '../../types/PersonTypes';
import { useSelector } from 'react-redux';
import { SpringPageableType } from '../../types/SpringPageableType';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import { CustomPagination } from '../../components/Pagination';
import { PageSizeSelect } from '../../components/PageSizeSelect';
import { CustomInput } from '../../components/Input';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonDataComponent } from '../../components/PersonDataComponent';
import { clearUser } from '../../store/user';

export const UserManagementScreen: FunctionComponent = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [deleteId, setDeleteId] = useState('');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [searchOib, setSearchOib] = useState('');
  const [deleteOib, setDeleteOib] = useState('');

  useEffect(() => {
    var pageable: PageableSpring = {
      page: page - 1,
      size: pageSize,
    };
    dispatch(fetchPersonsThunk(pageable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  const personsData: PersonData[] = useSelector(
    (state: RootState) => state.person.content,
  );

  const foundPerson: PersonData = useSelector(
    (state: RootState) => state.person.foundPerson,
  );

  const pageableInfo: SpringPageableType = useSelector(
    (state: RootState) => state.person.pageableData,
  );

  const handlePageChange = async (page: number) => {
    setPage(page - 1);
    var pageable: PageableSpring = {
      page: page - 1,
      size: pageSize,
    };
    await dispatch(fetchPersonsThunk(pageable));
  };

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(Number(pageSize));
  };

  const tableHeaders = [
    'userManagementScreen.table.name',
    'userManagementScreen.table.lastName',
    'userManagementScreen.table.OIB',
    'userManagementScreen.table.status',
  ];
  const tableContentKeys: CustomCellType[] = [
    { name: 'name', type: 'string' },
    { name: 'lastName', type: 'string' },
    { name: 'OIB', type: 'string' },
    { name: 'status', type: 'string' },
  ];

  const closeModal = () => {
    setModalVisible(false);
    var pageable: PageableSpring = {
      page: page - 1,
      size: pageSize,
    };
    dispatch(fetchPersonsThunk(pageable));
  };

  const openModal = (id: string) => {
    setConfirmationModalVisible(true);
    setDeleteId(id);
  };

  const deleteDataById = async (id: string) => {
    console.log(id);
  };

  const closeConfirmationModal = () => {
    setConfirmationModalVisible(false);
  };

  const defaultValues = {
    searchOib: '',
    deleteOib: '',
  };

  const personSchema = object().shape({
    searchOib: string().required().min(11).max(11),
    deleteOib: string().required().min(11).max(11),
  });

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(personSchema),
  });

  const searchPersonByOib = async () => {
    var oib = getValues('searchOib');
    if (oib !== undefined && oib.length == 11) {
      await dispatch(fetchPersonByOibThunk(oib));
    }
  };

  const deletePersonByOib = async () => {};

  return (
    <div className={classes.mainContainer}>
      <div className={classes.titleContainer}>
        <h1 style={{ paddingLeft: '10px' }} className={classes.titleText}>
          {t('userManagementScreen.title')}
        </h1>
        <p
          onClick={async () => {
            await dispatch(clearUser());
          }}
          style={{ color: 'white', paddingRight: '10px' }}>
          {t('common.logout')}
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <div
          style={{
            alignItems: 'center',
          }}>
          <CustomButtonConfirm
            text={t('userManagementScreen.addPerson')}
            styleValid={classes.buttonStyle}
            isValid={true}
            submit={() => {
              setModalVisible(true);
            }}
          />
        </div>
      </div>
      <div className={classes.tableContainer}>
        <CustomTable
          tableHeaders={tableHeaders}
          rows={personsData}
          crudButtons={false}
          tableContentKeys={tableContentKeys}
          deleteFunction={openModal}
          //updateFunction={updateItem}
        />
        <div className={classes.paginationContainer}>
          <CustomPagination
            page={page + 1}
            total={pageableInfo.totalPages}
            handlePageChange={handlePageChange}
          />
          <PageSizeSelect handlePageSizeChange={handlePageSizeChange} />
        </div>
      </div>
      <PersonModal visible={modalVisible} onCancel={closeModal} />
      <div className={classes.personManagementContainer}>
        <div className={classes.personFinderContainer}>
          <h2 className={classes.subTitleText}>
            {t('userManagementScreen.findPerson')}
          </h2>
          <div className={classes.searchContainer}>
            <div style={{ width: '60%' }}>
              <Controller
                control={control}
                name="searchOib"
                shouldUnregister={true}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <CustomInput
                    value={value}
                    onChange={onChange}
                    label={t('userManagementScreen.OIB')}
                  />
                )}
              />
            </div>
            <CustomButtonConfirm
              text={t('userManagementScreen.findPersonButton')}
              styleValid={classes.buttonStyleSearchDelete}
              isValid={true}
              submit={() => {
                searchPersonByOib();
              }}
            />
          </div>
          <PersonDataComponent person={foundPerson} />
        </div>
        <div className={classes.personDeleteContainer}>
          <h2 className={classes.subTitleText}>
            {t('userManagementScreen.deletePerson')}
          </h2>
          <div className={classes.searchContainer}>
            <div style={{ width: '60%' }}>
              <Controller
                control={control}
                name="deleteOib"
                shouldUnregister={true}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <CustomInput
                    value={value}
                    onChange={onChange}
                    label={t('userManagementScreen.OIB')}
                  />
                )}
              />
            </div>
            <CustomButtonConfirm
              text={t('userManagementScreen.deletePersonButton')}
              styleValid={classes.buttonStyleSearchDelete}
              isValid={true}
              submit={() => {
                deletePersonByOib();
              }}
            />
          </div>
        </div>
      </div>
      <ConfirmationModal
        content={t('userManagementScreen.modal.deletePersonModalContent')}
        onCancel={closeConfirmationModal}
        id={deleteId}
        onOk={deleteDataById}
        title={t('userManagementScreen.modal.deletePersonModalTitle')}
        okText={t('common.modal.yes')}
        cancelText={t('common.modal.no')}
        visible={confirmationModalVisible}
      />
    </div>
  );
};

const useStyles = createStyles(theme => ({
  mainContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(135deg, ${theme.colors.indigo[6]}, ${theme.colors.cyan[4]})`,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleText: {
    color: themeColors.theme.colors.white,
    fontSize: 50,
  },
  tableContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '30%',
    height: 50,
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
  paginationContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  personManagementContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  personFinderContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  personDeleteContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  subTitleText: {
    color: themeColors.theme.colors.white,
    fontSize: 35,
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '90%',
    paddingLeft: themeColors.sizes.padding,
  },
  buttonStyleSearchDelete: {
    width: '30%',
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
