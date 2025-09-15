import React, { FC } from 'react';
import cn from 'classnames';
import cls from './AccountButton.module.scss';
import AccountIcon from '@/shared/assets/icons/account_icon.svg?react';

interface AccountButtonProps {
  onClick: () => void;
  title: string;
}

export const AccountButton: FC<AccountButtonProps> = ({ onClick, title }) => {
  return (
    <div className={cls.accountButtonWrapper}>
      <button onClick={onClick} className={cn(cls.accountButton)} title={title}>
        <AccountIcon />
      </button>
      <span className={cn(cls.iconTitle)}>{title}</span>
    </div>
  );
};
