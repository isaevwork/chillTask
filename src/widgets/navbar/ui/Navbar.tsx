import React from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss'
import SearchIcon from '../../../shared/assets/icons/search_icon.svg'

interface NavbarProps {
    className?: string ;
}

export const Navbar = ({className}: NavbarProps) => {

    return (
        <div className={classNames(cls.navbar, {}, [className])}>
            <SearchIcon />
        </div>

    )
}


