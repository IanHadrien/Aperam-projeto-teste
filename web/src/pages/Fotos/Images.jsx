import React from 'react'
import { NavBar } from '../../components/NavaBar/NavBar'

export const Images = () => {
  return (
    <div>
      <NavBar />

      <div className="content">
        <h1 className='Container-Title text-center mt-1 mb-3'>
          <i className='bx bxs-image'></i>
          <p>Fotos</p>
        </h1>

        <div className='container border shadow rounded px-4 pb-4 pt-2 mb-5'>
          Teste
        </div>
      </div>
    </div>
  )
}
