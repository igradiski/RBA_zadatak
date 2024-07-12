import { createStyles } from "@mantine/core";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store";
import themeColors from "../../theme";
import { CustomTable } from "../../components/Table";
import { CustomCellType } from "../../types/CustomCellType";
import { CustomButtonConfirm } from "../../components/FormButton";
import { Flex } from "antd";
import { PersonModal } from "./insertModal";
import { PageableSpring } from "../../types/Pageable";
import { fetchPersonsThunk } from "../../store/person";

export const UserManagementScreen: FunctionComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  const [modalVisible, setModalVisible] = useState(false);

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    var pageable: PageableSpring = {
      page: page - 1,
      size: pageSize,
    };
    dispatch(fetchPersonsThunk(pageable));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  const persons = [
    {
      name: "dasdasdsad",
      lastName: "edvsfd312312sdfas",
      OIB: "C",
      status: "Carbon",
    },
    {
      name: "dasdasdsad",
      lastName: "edvsfdsd12312312as",
      OIB: "C",
      status: "Carbon",
    },
    {
      name: "dasdas213123123dsad",
      lastName: "edvs31231231fdsdfas",
      OIB: "C",
      status: "Carbon",
    },
    {
      name: "sdas",
      lastName: "sda",
      OIB: "bsw",
      status: "Carbon2",
    },
  ];

  const tableHeaders = [
    "userManagementScreen.table.name",
    "userManagementScreen.table.lastName",
    "userManagementScreen.table.OIB",
    "userManagementScreen.table.status",
  ];
  const tableContentKeys: CustomCellType[] = [
    { name: "name", type: "string" },
    { name: "lastName", type: "string" },
    { name: "OIB", type: "string" },
    { name: "status", type: "string" },
  ];

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <div className={classes.mainContainer}>
      <div className={classes.titleContainer}>
        <h1 style={{ paddingLeft: "10px" }} className={classes.titleText}>
          {t("userManagementScreen.title")}
        </h1>
        <p style={{ color: "white", paddingRight: "10px" }}>
          {t("common.logout")}
        </p>
      </div>
      <div className={classes.buttonContainer}>
        <div
          style={{
            alignItems: "center",
          }}
        >
          <CustomButtonConfirm
            text={t("userManagementScreen.addPerson")}
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
          rows={persons}
          crudButtons={false}
          tableContentKeys={tableContentKeys}
          //deleteFunction={openModal}
          //updateFunction={updateItem}
        />
      </div>
      <PersonModal visible={modalVisible} onCancel={closeModal} />
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  mainContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: `linear-gradient(135deg, ${theme.colors.indigo[6]}, ${theme.colors.cyan[4]})`,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  titleText: {
    color: themeColors.theme.colors.white,
    fontSize: 50,
  },
  tableContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonStyle: {
    width: "30%",
    height: 50,
    backgroundColor: "transparent",
    color: themeColors.theme.colors.white,
    fontWeight: 500,
    fontFamily: "Roboto",
    fontSize: 16,
    boxShadow: "0 0 0 0",
    border: "1px solid black ",
    marginRight: "20px",
    "@media (max-width: 1200px)": {
      width: "35%",
      height: 50,
      backgroundColor: "transparent",
      color: themeColors.theme.colors.white,
      fontWeight: 500,
      fontFamily: "Roboto",
      minWidth: "150px",
    },
  },
}));
