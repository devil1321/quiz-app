import React from 'react'
const NavbarItem = ({theme,icon,text,nr}) => {
    return (
        <div className={`nav__item ${theme} ${nr}`}>
            <img src={icon} alt="icon"/>
            <div className={`nav__line ${theme}`}></div>
            <p>{text}</p>
        </div>
    )
}

export default NavbarItem
