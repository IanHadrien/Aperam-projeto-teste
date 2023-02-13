import React, { useState } from 'react'
import './NavBar.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { Popover, Typography } from '@mui/material';

export const NavBar = () => {
  const [name, setName] = useState(localStorage.getItem("name"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuMobile, setMenuMobile] = useState(0);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);

    if(menuMobile === 0) {
      setMenuMobile(1);
    } else {
      setMenuMobile(0);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div id='NavBar-Body'>
      
      <input type="checkbox" id="check" />
      {/* <!--header area start--> */}
      <div id="NavBar-Header">
        {/* <label>
            <i className='bx bx-menu' id="sidebar_btn"></i>
        </label> */}
        <div className="left_area">
            {/* <h3>Go<span>Snippets</span></h3> */}
            <img src={Logo} /> 
        </div>
        <div className="NavBarright_area" onClick={handleClick}>
            {/* <a href="#" className="logout_btn">Logout</a> */}
          <i className='bx bx-user-circle'></i>
          {name}
          <i className='bx bx-chevron-down'></i>
        </div>
        <Popover
          id={id}
          className="Popover-container"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Link className='Popover-Menu' to='/usuario'>
              <span>Meu Perfil</span>
            </Link> <br />
            <Link className='Popover-Menu' to='/'>
              <span>Sair</span>
            </Link>
          </Typography>
        </Popover>
      </div>

      {/* <!--mobile navigation bar start--> */}
      <div className="mobile_nav">
        <div className={`${menuMobile === 0 ? 'mobile_nav_items' : 'mobile_nav_items mobile_nav_items_MOBILE'}`}>
          <Link to='/dashbord'>
            <i className='bx bx-data'></i><span>Dashboard</span>
          </Link>
          <Link to='/fotos'>
            <i className='bx bxs-image'></i><span>Fotos</span>
          </Link>
          <Link to='/usuario'>
            <i className='bx bx-user-circle'></i><span>Meu Perfil</span>
          </Link>
          <Link className='NavBar-BordEnd' to='/'>
            <i className='bx bx-log-in'></i><span>Sair</span>
          </Link>
        </div>
      </div>

      <div className="sidebar">
        <Link to='/dashbord'>
          <i className='bx bx-data'></i><span>Dashboard</span>
        </Link>
        <Link to='/fotos'>
          <i className='bx bxs-image'></i><span>Fotos</span>
        </Link>
        <Link to='/usuario'>
          <i className='bx bx-user-circle'></i><span>Meu Perfil</span>
        </Link>
        <Link className='NavBar-BordEnd' to='/'>
          <i className='bx bx-log-in'></i><span>Sair</span>
        </Link>
      </div>

    </div>
  )
}
