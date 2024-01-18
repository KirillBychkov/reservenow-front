import { PaginatorPageChangeEvent } from 'primereact/paginator';
import { Paginator as PrPaginator } from 'primereact/paginator';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  first: number;
  rows?: number;
  totalRecords: number;
  onPageChange: (event: PaginatorPageChangeEvent) => void;
}

const Paginator: React.FC<Props> = ({
  first,
  rows,
  totalRecords,
  onPageChange,
}) => {
  const { t } = useTranslation();

  return (
    <PrPaginator
      template={{
        layout:
          'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      }}
      currentPageReportTemplate={`${t('states.shown')} {first} - {last} ${t(
        'states.of',
      )} {totalRecords}`}
      style={{ justifyContent: 'flex-end' }}
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      onPageChange={onPageChange}
    />
  );
};

export default Paginator;
