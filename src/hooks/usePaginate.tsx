import { Pagination } from '@/store/ClientsStore';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const usePaginate = ({ rowsPerPage }: Pagination) => {
  const [first, setFirst] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);

  const handleSetPage = (page: number) => {
    setSkip(page * rowsPerPage);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    handleSetPage(event.page);
    setFirst(event.first);
  };

  return { limit: rowsPerPage, skip, first, onPageChange };
};

export default usePaginate;
