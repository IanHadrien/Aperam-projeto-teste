import React, { useState } from 'react'
import './NavBar.css';
import Logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  const [name, setName] = useState(localStorage.getItem("name"));

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
        <div className="NavBarright_area">
            {/* <a href="#" className="logout_btn">Logout</a> */}
          <i className='bx bx-user-circle'></i>
          {name}
        </div>
      </div>

      {/* <!--mobile navigation bar start--> */}
      <div className="mobile_nav">
        <div className="mobile_nav_items">
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
