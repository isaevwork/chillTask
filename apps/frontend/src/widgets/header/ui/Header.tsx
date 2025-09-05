import cn from 'classnames';
import cls from './Header.module.scss';
import SearchIcon from 'shared/assets/icons/search_icon.svg';
import React from 'react';

export const Header = () => {
  return (
    <div className={cn(cls.header)}>
      <div className={cn(cls.mainBlock)}>
        <SearchIcon />
      </div>
    </div>
  );
};
