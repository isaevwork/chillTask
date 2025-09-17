import React from 'react';
import cn from 'classnames';
import cls from './Navbar.module.scss';
import MenuIcon from '../../../shared/assets/icons/menu_icon.svg?react';
import { NavbarItem } from '@/shared/NavbarItem';
import { Link, useNavigate } from 'react-router-dom';
import TimerIcon from '@/shared/assets/icons/timer_icon.svg?react';
import CalendarIcon from '@/shared/assets/icons/calendar_icon.svg?react';
import { AccountButton } from '@/shared/AccountButton/AccountButton';
import UserProfile from '@/features/user-profile/UserProfile';
import { LoginPopup } from '@/features/auth/LoginPopup/LoginPopup';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);

  // TODO: Заменить на реальную проверку аутентификации
  const isAuthenticated = false; // Пока что всегда false для демонстрации
  const user = isAuthenticated
    ? {
        name: 'John Doe',
        email: 'john@example.com',
        avatar: undefined,
      }
    : null;

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleProfileOpen = () => {
    if (isAuthenticated) {
      setIsProfileOpen(true);
    } else {
      setIsLoginPopupOpen(true);
    }
  };

  const handleLoginPopupClose = () => {
    setIsLoginPopupOpen(false);
  };

  const handleLoginSuccess = () => {
    // TODO: Обновить состояние аутентификации
    console.log('Login successful!');
    setIsLoginPopupOpen(false);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout');
    setIsProfileOpen(false);
    // TODO: Добавить реальную логику выхода
  };

  const handleEdit = () => {
    console.log('Edit profile');
    setIsProfileOpen(false);
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
          <AccountButton
            onClick={handleProfileOpen}
            title={isAuthenticated ? 'Аккаунт' : 'Войти'}
          />

          {isAuthenticated && user && (
            <UserProfile
              user={user}
              isOpen={isProfileOpen}
              onClose={handleProfileClose}
              onEdit={handleEdit}
              onLogout={handleLogout}
            />
          )}

          {!isAuthenticated && (
            <LoginPopup
              isOpen={isLoginPopupOpen}
              onClose={handleLoginPopupClose}
              onLoginSuccess={handleLoginSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};
