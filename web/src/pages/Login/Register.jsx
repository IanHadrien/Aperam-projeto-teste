import React, { useState } from 'react'
import ImageBackground from '../../assets/img/paisagem.png';
import Logo from '../../assets/img/logo.png';
import './login.css';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [formErro, setFormErro] = useState(false);
  const [erroMensage, setErroMensage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if(!name) {
      setFormErro(true);
      setErroMensage('Digite um nome inválido');
      return
    }
    if(!email) {
      setFormErro(true);
      setErroMensage('Digite um e-mail inválido');
      return
    }
    if(!password) {
      setFormErro(true);
      setErroMensage('Digite um senha inválida');
      return
    }
    if(password !== password2) {
      setFormErro(true);
      setErroMensage('Senhas diferentes');
      return
    }

    console.log("Dados: ", name, email, password);
    setFormErro(false);
  }

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
              Preencha os campos abaixo e crie em sua conta
            </div>
          </div>

          <div className="form Login-Form">
            <form className="form-inline">

              <div className="pt-1">
                <label className="sr-only Login-label">
                  Nome
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className='Login-Icon bx bx-user-circle'></i>
                    </div>
                  </div>
                  <input type="text" className="form-control" 
                    placeholder="Digite seu nome"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className='pt-2'>
                <label className="sr-only Login-label">
                  E-mail
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className='Login-Icon bx bx-envelope'></i>
                    </div>
                  </div>
                  <input type="text" className="form-control" 
                    placeholder="Digite seu e-mail" 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className='pt-2'>
                <label className="sr-only Login-label">
                  Senha
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className='Login-Icon bx bx-lock-alt'></i>
                    </div>
                  </div>
                  <input type="password" className="form-control" 
                    placeholder="********" 
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className='pt-2'>
                <label className="sr-only Login-label">
                  Confirme sua senha
                </label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className='Login-Icon bx bx-lock-alt'></i>
                    </div>
                  </div>
                  <input type="password" className="form-control" 
                    placeholder="********"
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>
              </div>  

              <Link className='Login-LinkNewCont' 
                to="/">
                <div className='Login-NewCont pt-2'>
                  Já tenho uma conta
                </div>
              </Link>
              
              <div className='pt-2'>
                <button 
                    type="submit" 
                    className="Login-buttonEntrar btn btn-primary mb-2"
                    onClick={handleSubmit}
                  >
                  Entrar
                </button>
              </div>

              { formErro &&
              <Alert variant="outlined" severity="error">
                {erroMensage}
              </Alert> }
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
