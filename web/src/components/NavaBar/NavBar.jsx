import React from 'react'
import './NavBar.css';
import Logo from '../../assets/img/logo.png';

const name = localStorage.getItem("name");

export const NavBar = () => {
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
              <a href="#"><i className='bx bx-data'></i><span>Dashboard</span></a>
              <a href="#"><i className='bx bxs-image'></i><span>Fotos</span></a>
              <a href="#"><i className='bx bx-user-circle'></i><span>Meu Perfil</span></a>
              <a className='NavBar-BordEnd' href="#"><i className='bx bx-log-in'></i><span>Sair</span></a>
          </div>
      </div>

      <div className="sidebar">
          <a href="#"><i className='bx bx-data'></i><span>Dashboard</span></a>
          <a href="#"><i className='bx bxs-image'></i><span>Fotos</span></a>
          <a href="#"><i className='bx bx-user-circle'></i><span>Meu Perfil</span></a>
          <a className='NavBar-BordEnd' href="#"><i className='bx bx-log-in'></i><span>Sair</span></a>
      </div>

      {/* <div className="content">
          <div className="card">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div><div className="card">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
          <div className="card">
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
          </div>
      </div> */}

    </div>
  )
}
