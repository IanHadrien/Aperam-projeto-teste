import React, { useState } from 'react'
import ImageBackground from '../../assets/img/paisagem.png';
import Logo from '../../assets/img/logo.png';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import axios from '../../services/axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formErro, setFormErro] = useState(false);
  const [erroMensage, setErroMensage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if(!email) {
      setFormErro(true);
      setErroMensage('Digite um e-mail válido');
      return
    }

    if(!password) {
      setFormErro(true);
      setErroMensage('Digite um senha válida');
      return
    }

    const regTemp = {
      email, password,
    };

    await axios.post('/tokens/', regTemp).then((respose) => {
      console.log('Success: ', respose.data);
      setFormErro(false);

      localStorage.setItem("token", respose.data.token);
      localStorage.setItem("email", respose.data.user.email);
      localStorage.setItem("id", respose.data.user.id);
      localStorage.setItem("name", respose.data.user.name);

      navigate('/dashbord');
    }).catch((err) => {
      console.log('Error', err.message);
      setFormErro(true);
      setErroMensage('Usuário não existe');
    });
    console.log("Dados: ", email, password);
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
                    <div className="input-group-text">
                      <i className='Login-Icon bx bx-envelope'></i>
                    </div>
                  </div>
                  <input type="email" className="form-control" 
                    placeholder="E-mail" 
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
              

              <Link className='Login-LinkNewCont' to="/cadastro-usuario">
                <div className='Login-NewCont pt-2'>
                  Criar Nova Conta
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
              </Alert>
              }
              
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
