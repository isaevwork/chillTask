import cn from 'classnames';
import cls from './NavbarItem.module.scss';
import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavbarItemProps {
  handleOpen: () => void;
  to: string;
  icon: React.ElementType;
  title: string;
  disableBackground?: boolean;
}

export const NavbarItem: FC<NavbarItemProps> = ({
  to,
  handleOpen,
  icon: Icon,
  title,
  disableBackground,
}) => {
  const location = useLocation();
  console.log(location);

  console.log(cls);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(cls.navbarItem, { [cls.active]: isActive })}
      onClick={handleOpen}
    >
      <div className={cn(cls.iconWrapper, { [cls.noBackground]: disableBackground })}>
        <Icon />
      </div>
      <span className={cn(cls.iconTitle)}>{title}</span>
    </NavLink>
  );
};
