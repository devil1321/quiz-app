import React from 'react'
import { Link } from 'react-router-dom'
import NavbarItem from './NavbarItem'

const Navbar = ({theme}) => {
    return (
        <div className="nav">
            <Link to={`/technology/play`}>
               <NavbarItem theme={theme} icon="/assets/icons/technologia_ikona_.svg" text="TECHNOLOGIA" nr="tech"/>
            </Link>
            <Link to={`/culture/play`}>
               <NavbarItem theme={theme} icon="/assets/icons/kultura_ikona.svg" text="KULTURA" nr="cul"/>
            </Link>
            <Link to={`/automotive/play`}>
               <NavbarItem theme={theme} icon="/assets/icons/motoryzacja_ikona.svg" text="MOTORYZACJA" nr="auto"/>
            </Link>  
            <Link to={`/code/play`}>
                <NavbarItem theme={theme} icon="/assets/icons/programowanie_ikona.svg" text="CODE" nr="prog"/>
            </Link>
            <Link to={`/history/play`}>
               <NavbarItem theme={theme} icon="/assets/icons/historia_ikona.svg" text="HISTORIA" nr="his"/>
            </Link>
        </div>
    )
}

export default Navbar
