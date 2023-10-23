import { DataTableStateEvent } from 'primereact/datatable';
import { useState } from 'react';

export type SortOrder = 0 | 1 | -1 | null | undefined;
export type SortField = string;

export const useSort = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(0);
  const [sort, setSort] = useState<string>('');

  const handleSort = (e: DataTableStateEvent) => {
    setSortField(e.sortField);
    setSortOrder(e.sortOrder);
    setSort(e.sortField && e.sortOrder ? `${e.sortField}:${e.sortOrder}` : '');
  };

  return { sortField, sortOrder, handleSort, sort };
};
