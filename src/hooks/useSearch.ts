import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { useState } from 'react';

const useSearch = (
  onPageChange: ({
    page,
    first,
  }: Pick<PaginatorPageChangeEvent, 'page' | 'first'>) => void,
) => {
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
    onPageChange({ page: 0, first: 0 });
  };

  return { search, handleSearch };
};

export default useSearch;
