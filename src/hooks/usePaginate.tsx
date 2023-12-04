import { Filters } from '@/models/Filters';
import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const usePaginate = ({ limit }: Pick<Filters, 'limit'>) => {
  const [first, setFirst] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const fallBackLimit = limit || 8;
  const handleSetPage = (page: number) => {
    setSkip(page * fallBackLimit);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    handleSetPage(event.page);
    setFirst(event.first);
  };

  return { limit: fallBackLimit, skip, first, onPageChange };
};

export default usePaginate;
