import React, { useState } from 'react'
import { NavBar } from '../../components/NavaBar/NavBar'
import axios from '../../services/axios';
import Alert from '@mui/material/Alert';
import './MyPerfil.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Id = localStorage.getItem("id");

export const MyPerfil = () => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  // const [password, setPassword] = useState('');
  const [password, setPassword2] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [formErro, setFormErro] = useState(false);
  const [formErroSenha, setFormErroSenha] = useState(false);
  const [typeErro, setTypeErro] = useState('success');
  const [erroMensage, setErroMensage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length < 5) {
      console.log('Nome muito pequeno');
      return;
    }

    if (email.length < 5) {
      console.log('Email muito pequeno');
      return;
    }

    const regTemp = {
      name, email,
    };

    await axios.put(`/usuario/${Id}`, regTemp).then((respose) => {
      console.log("Salvar dados: ", respose.data);
      setFormErro(true);
      setErroMensage('Dados atualizados com sucesso');
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
    }).catch((err) => {
      console.log('Error', err.message);
      console.log('Usuário não pode ser cadastrado');
      setFormErro(false);
    });
  }

  async function handleSubmitPassword(e) {
    e.preventDefault();
    console.log("Salvar dados Senha: ", password, newPassword);

    if (password.length < 8 || newPassword.length < 8) {
      setTypeErro('error');
      setErroMensage('Senha precisa ser maior que 8 digitos');
      setFormErroSenha(true);
      return
    }

    if (password !== newPassword) {
      setTypeErro('error');
      setErroMensage('Senhas diferentes');
      setFormErroSenha(true);
      return
    }

    const regTemp = { password };

    await axios.put(`/usuario/${Id}`, regTemp).then((respose) => {
      console.log("Salvar dados: ", respose.data);
      setFormErroSenha(true);
      setTypeErro('success');
      setErroMensage('Senha atualizada');
    }).catch((err) => {
      console.log('Error', err.message);
      setFormErro(false);
    });
  }

  async function handleClear(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Deseja excluir seu usuário?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir.',
      cancelButtonText: 'Não, cancelar.'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/usuario/${Id}`).then((respose) => {
          console.log("Deletar dados: ", respose.data);
          localStorage.clear();
        }).catch((err) => {
          console.log('Error', err.message);
        });

        Swal.fire(
          'Deletado!',
          'Seu usuário foi deletado!',
          'success'
        )

        navigate('/');
      }
    })
  }

  return (
    <div>
      <NavBar />

      <div className="content">
        <h1 className='Container-Title text-center mt-1 mb-3'>
          <i className='bx bx-user-circle'></i>
          <p>Meu Perfil</p>
        </h1>

        <div className='container border shadow rounded px-4 pb-4 pt-2 mb-5'>
          <h2>Meus Dados</h2>
          <p>Atualize os dados da sua conta, nome e endereço de email.</p>

          <div className="pt-3">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Nome:</div>
              </div>
              <input type="text" className="form-control" 
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-1">
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Email:</div>
              </div>
              <input type="email" className="form-control" 
                placeholder="E-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
          </div>

          <div className='pt-4'>
            <button 
              type="submit" 
              className="Login-buttonEntrar My-Perfil-Salvar btn btn-primary mb-2"
              onClick={handleSubmit}
            >
              Salvar
            </button>
          </div>

          { formErro &&
          <Alert variant="outlined" severity="success">
            {erroMensage}
          </Alert> }

          <hr className='my-3'/>

          <div className='pt-2'>
            <h2>Atualizar senha</h2>
            <p>Certifique-se de que sua conta esteja usando uma senha longa e aleatória para se manter segura.</p>

            {/* <div className="pt-3">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Senha atual:</div>
                </div>
                <input type="password" className="form-control" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div> */}

            <div className="pt-3">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Nova senha:</div>
                </div>
                <input type="password" className="form-control" 
                  placeholder="********" 
                  value={password}
                  onChange={(e) => setPassword2(e.target.value)}
                  />
              </div>
            </div>

            <div className="pt-1">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Confirme a nova senha:</div>
                </div>
                <input type="password" className="form-control" 
                  placeholder="********" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  />
              </div>
            </div>

            <div className='pt-4'>
              <button 
                type="submit" 
                className="Login-buttonEntrar My-Perfil-Salvar btn btn-primary mb-2"
                onClick={handleSubmitPassword}
              >
                Salvar
              </button>
            </div>

            { formErroSenha &&
            <Alert variant="outlined" severity={typeErro}>
              {erroMensage}
            </Alert> }
          </div>

          <hr className='my-3'/>

          <div>
            <h2>Excluir Conta</h2>
            <p>Depois que sua conta for excluída, não será possível o login com as suas credenciais.</p>

            <button type="button" className="btn btn-danger d-flex" onClick={handleClear}>
              <span className="material-symbols-outlined">
                delete
              </span>
              Excluir Conta
            </button>
          </div>

          <hr className='my-3'/>

        </div>
      </div>
    </div>
    
  )
}
