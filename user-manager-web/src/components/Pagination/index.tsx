import React from 'react';
import { Pagination, Select, createStyles } from '@mantine/core';
import themeColors from '../../theme';

type PaginationProps = {
  total: number;
  page?: number;
  handlePageChange: (page: number) => void;
};

export const CustomPagination = (props: PaginationProps) => {
  const { classes } = useStyles();
  return (
    <Pagination
      total={props.total}
      value={props.page}
      //initialPage={1}
      onChange={props.handlePageChange}
      classNames={
        {
          //item: classes.item,
          //active: classes.active,
        }
      }
    />
  );
};

const useStyles = createStyles(theme => ({
  item: {
    background: 'transparent',
    border: `1px solid ${themeColors.theme.colors.forest}`,
    fontSize: 16,
    color: 'white',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: themeColors.theme.colors.greenGradientLight,
      color: themeColors.theme.colors.black,
    },
  },
  active: {
    backgroundColor: themeColors.theme.colors.forest,
    border: '1px solid black',
  },
}));
