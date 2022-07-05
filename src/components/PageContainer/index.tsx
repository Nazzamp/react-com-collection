import cn from 'classnames/bind';
import type { ReactNode } from 'react';
import React from 'react';

import styles from './index.module.scss';

const cx = cn.bind(styles);

type IPageConProps = {
  children: ReactNode;
};

const PageContainer = ({ children }: IPageConProps) => {
  // return <div className={styles.pageContainer}>abc test text</div>;
  return (
    <div className={cx('page-container-wrapper')}>
      <div className={cx('page-container')}>{children}</div>
    </div>
  );
};

export default PageContainer;
