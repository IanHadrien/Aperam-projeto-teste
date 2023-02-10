import React from 'react'
import ImageBackground from '../../assets/img/paisagem.png';
import Logo from '../../assets/img/logo.png';
import './login.css';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='Login-container'>
      <div className='Login-ImageBackground'>
        <img src={ImageBackground} />
      </div>

      <div className='Login-FormContainer'>
        <div>
          <div className='Login-LogoText'>
            <div className='Login-Logo'>
              <img src={Logo} />
            </div>
            <div className='p-2'>
              Preencha os campos abaixo e entre em sua conta
            </div>
          </div>

          <div className="form Login-Form">
            <form className="form-inline">

              <div className="pt-1">
                <label className="sr-only Login-label">
                  E-mail
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input type="text" className="form-control" 
                  id="inlineFormInputGroupUsername2" placeholder="E-mail" />
                </div>
              </div>
              
              <div className='pt-2'>
                <label className="sr-only Login-label">
                  Senha
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input type="text" className="form-control" 
                  id="inlineFormInputGroupUsername2" placeholder="********" />
                </div>
              </div>
              

              <Link className='Login-LinkNewCont' to="/cadastro-usuario">
                <div className='Login-NewCont pt-2'>
                  Criar Nova Conta
                </div>
              </Link>
              
              <div className='pt-2'>
                <button type="submit" className="Login-buttonEntrar btn btn-primary mb-2">
                  Entrar
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
