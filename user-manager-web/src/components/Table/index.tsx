import { Badge, createStyles, Table } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CrudButtons } from './crudButtons';
import dayjs from 'dayjs';
import themeColors from '../../theme';
import { CustomCellType } from '../../types/CustomCellType';

type CustomTableProps = {
  tableHeaders: string[];
  tableContentKeys: CustomCellType[];
  rows?: any[];
  crudButtons: boolean;
  deleteFunction?: (id: string) => void;
  updateFunction?: (id: string) => void;
};
export const CustomTable = (props: CustomTableProps) => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const header = props.tableHeaders.map(
    (headerValue: string, index: number) => (
      <th
        key={index}
        style={{
          color: 'black',
          textAlign: 'center',
          backgroundColor: 'gainsboro',
          borderTopLeftRadius: index === 0 ? '15px' : '0px',
          borderTopRightRadius:
            index + 1 === props.tableHeaders.length ? '15px' : '0px',
        }}>
        {t(headerValue)}
      </th>
    ),
  );

  const renderStringCell = (
    row: any,
    rowData: string,
    index: number,
    lastRow: boolean,
  ) => {
    var data: string = row[rowData as keyof typeof row];
    var tableData: string = data.length > 20 ? data.substring(0, 19) : data;

    return (
      <th
        style={{
          borderBottomLeftRadius: index === 0 && lastRow ? '15px' : '0px',
          borderBottomRightRadius:
            lastRow && index + 1 === props.tableHeaders.length ? '15px' : '0px',
          textAlign: 'center',
        }}
        key={index}>
        {tableData}
      </th>
    );
  };

  const renderDateCell = (
    row: any,
    rowData: string,
    index: number,
    lastRow: boolean,
  ) => {
    var data: string = row[rowData as keyof typeof row];
    var date: string = dayjs(data).format('DD.MM.YYYY.').toString();
    return (
      <th
        style={{
          borderBottomLeftRadius: index === 0 && lastRow ? '15px' : '0px',
          borderBottomRightRadius:
            lastRow && index === props.tableHeaders.length ? '15px' : '0px',
        }}
        key={index}>
        {date}
      </th>
    );
  };

  const renderArray = (
    row: any,
    rowData: string,
    index: number,
    lastRow: boolean,
  ) => {
    var data: string[] = row[rowData as keyof typeof row];
    return (
      <th
        style={{
          borderBottomLeftRadius: index === 0 && lastRow ? '15px' : '0px',
          borderBottomRightRadius:
            lastRow && index === props.tableHeaders.length ? '15px' : '0px',
        }}
        key={index}>
        {data?.map((item: string) => {
          return (
            <Badge
              style={{ margin: '5px' }}
              size="md"
              variant="gradient"
              gradient={{
                from: themeColors.theme.colors.forest,
                to: themeColors.theme.colors.hoverGreen,
                deg: 90,
              }}>
              {item}
            </Badge>
          );
        })}
      </th>
    );
  };

  const renderContent = (
    row: any,
    rowData: string,
    index: number,
    lastRow: boolean,
  ) => {
    var tableContentKey = props.tableContentKeys.find(
      (item: CustomCellType) => {
        return item.name === rowData;
      },
    );
    if (tableContentKey) {
      switch (tableContentKey?.type) {
        case 'string': {
          return renderStringCell(row, rowData, index, lastRow);
        }
        case 'date': {
          return renderDateCell(row, rowData, index, lastRow);
        }
        case 'picture': {
          return renderStringCell(row, rowData, index, lastRow);
        }
        case 'array': {
          return renderArray(row, rowData, index, lastRow);
        }
      }
    }
  };

  const renderRow = (row: any, rowIndex: any) => {
    const mappedRow: any = {};
    for (const keyData of props.tableContentKeys) {
      mappedRow[keyData.name] = row[keyData.name];
    }
    mappedRow['id'] = row['id'];
    row = mappedRow;
    return (
      <tr
        style={{
          backgroundColor: rowIndex % 2 ? 'transparent' : 'white',
        }}
        key={row.id}>
        {Object.keys(row).map((rowData: string, index: number) =>
          renderContent(
            row,
            rowData,
            index,
            props.rows?.length === rowIndex + 1 ? true : false,
          ),
        )}
        {props.crudButtons ? (
          <CrudButtons
            id={row.id}
            deleteFunction={props.deleteFunction}
            updateFunction={props.updateFunction}
            lastRow={props.rows?.length === rowIndex + 1 ? true : false}
          />
        ) : (
          <></>
        )}
      </tr>
    );
  };

  return (
    <Table className={classes.table}>
      <thead>
        <tr>{header}</tr>
      </thead>
      <tbody>
        {props.rows !== undefined
          ? props.rows.map((row, index) => renderRow(row, index))
          : null}
      </tbody>
    </Table>
  );
};

const useStyles = createStyles(theme => ({
  table: {
    backgroundColor: theme.colors.indigo[1],
    borderRadius: '20px',
    marginBottom: '10px',
  },
  headerText: {
    color: 'black',
    textAlign: 'center',
  },
}));
