import React from 'react';
import styles from './viewImage.module.scss';
import { DocumentOpen } from '@blueprintjs/icons';
import classNames from 'classnames';

interface Props {
  imageUrl: string;
}

const ViewImage: React.FC<Props> = ({ imageUrl }) => {
  const imageName = imageUrl.split('/').pop();

  return (
    <a
      href={imageUrl}
      target='_blank'
      className={classNames(styles.viewImage, 'paragraph paragraph--normal')}
    >
      {imageName} <DocumentOpen />
    </a>
  );
};

export default ViewImage;
