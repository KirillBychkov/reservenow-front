import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const usePaginate = ({ limit }: any) => {
  const [first, setFirst] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);

  const handleSetPage = (page: number) => {
    setSkip(page * limit);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    handleSetPage(event.page);
    setFirst(event.first);
  };

  return { limit, skip, first, onPageChange };
};

export default usePaginate;
