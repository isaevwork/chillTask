import React from 'react';
import cn from 'classnames';
import cls from './Navbar.module.scss';
import MenuIcon from '../../../shared/assets/icons/menu_icon.svg?react';
import { NavbarItem } from '@/shared/NavbarItem';
import { Link } from 'react-router-dom';
import TimerIcon from '@/shared/assets/icons/timer_icon.svg?react';
import CalendarIcon from '@/shared/assets/icons/calendar_icon.svg?react';
import { AccountButton } from '@/shared/AccountButton/AccountButton';
import UserProfile from '@/features/components/UserProfile/UserProfile';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfileOpen = () => {
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout');
    setIsProfileOpen(false);
  };

  const handleEdit = () => {
    console.log('Edit profile');
    setIsProfileOpen(false);
  };

  // Тестовые данные пользователя
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
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
          <AccountButton onClick={handleProfileOpen} title="Аккаунт" />

          <UserProfile
            user={user}
            isOpen={isProfileOpen}
            onClose={handleProfileClose}
            onEdit={handleEdit}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};
