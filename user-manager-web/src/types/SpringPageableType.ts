export type SpringPageableType = {
  content: [];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
  };
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  totalElements: number;
  totalPages: number;
};
