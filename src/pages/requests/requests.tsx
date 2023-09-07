import React from 'react';
import { useTranslation } from 'react-i18next';

const Requests: React.FC = () => {
  const { t } = useTranslation();

  return <div>{t('requests.requests')}</div>;
};

export default Requests;
