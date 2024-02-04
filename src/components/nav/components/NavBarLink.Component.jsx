import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBarLinkComponent = (props) => {
    const {btnTitle, redirect} = props;
  return (
    <NavLink className="nav-link" to={redirect}>{btnTitle}</NavLink>
  )
}

export default NavBarLinkComponent;