import React from 'react'
import { NavBar } from '../../components/NavaBar/NavBar'

export const Dashbord = () => {
  return (
    <div>
      <NavBar />

      <div className="content">
        <h1 className='Container-Title text-center mt-1 mb-3'>
          <i className='bx bx-data'></i>
          <p>DashBord</p>
        </h1>

        <div className='container border shadow rounded px-4 pb-4 pt-2 mb-5'>
          <h2>Upload de Arquivos</h2>

          <hr className='my-3'/>
          <h2>Arquivos (da semana atual)</h2>
        </div>
      </div>
    </div>
  )
}
