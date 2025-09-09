import React from 'react';
import cn from 'classnames';
import cls from './Navbar.module.scss';
import MenuIcon from '../../../shared/assets/icons/menu_icon.svg?react';
import { NavbarItem } from '@/shared/NavbarItem';
import { Link } from 'react-router-dom';
import TimerIcon from '@/shared/assets/icons/timer_icon.svg?react';
import CalendarIcon from '@/shared/assets/icons/calendar_icon.svg?react';
import AccountIcon from '@/shared/assets/icons/account_icon.svg?react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={cn(cls.navbar, { [cls.isOpen]: isOpen })}>
      <div className={cn(cls.iconBlock)}>
        <Link to={'/'} className={cn(cls.iconLogo)} onClick={handleOpen}>
          <MenuIcon />
        </Link>
        <div className={cn(cls.featureIcon)}>
          <NavbarItem handleOpen={handleOpen} to="/timer" icon={TimerIcon} title="Таймер" />
          <NavbarItem
            handleOpen={handleOpen}
            to="/calendar"
            icon={CalendarIcon}
            title="Календарь"
          />
        </div>

        <div className={cn(cls.settingsIcon)}>
          <NavbarItem
            handleOpen={handleOpen}
            to="/account"
            icon={AccountIcon}
            title="Аккаунт"
            disableBackground={true}
          />
        </div>
      </div>
    </div>
  );
};
