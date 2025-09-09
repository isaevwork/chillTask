import cn from 'classnames';
import cls from './Header.module.scss';
import SearchIconUrl from '@/shared/assets/icons/search_icon.svg?react';
import React from 'react';

export const Header = () => {
  return (
    <div className={cn(cls.header)}>
      <div className={cn(cls.mainBlock)}>
        <SearchIconUrl />
      </div>
    </div>
  );
};
