import { Pagination } from '@/store/ClientsStore';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const usePaginate = ({ rowsPerPage }: Pagination) => {
  const [first, setFirst] = useState<number>(0);
  const [limit, setLimit] = useState<number>(rowsPerPage);
  const [skip, setSkip] = useState<number>(0);

  const handleSetPage = (page: number) => {
    setSkip(page * rowsPerPage);
    setLimit(rowsPerPage + page * rowsPerPage);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    console.log(event);

    handleSetPage(event.page);
    setFirst(event.first);
  };

  return { limit, skip, first, onPageChange };
};

export default usePaginate;
