import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Swal from 'sweetalert2';
import { NavBar } from '../../components/NavaBar/NavBar'
import axios from '../../services/axios';
import './Dashbord.css';

const labelDisplayedRows = ({ from, to, count }) => `${from}-${to} de ${count}`;

export const Dashbord = () => {
  const [images, setImages] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [months, setMonths] = useState([]);
  const [weeks, setWeeks] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filename, setFileName] = useState('');
  const [idImage, setIdImage] = useState('');
  const [search, setSearch] = useState('');

  const [panel, setPanel] = useState(0);
  const [active, setActive] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios.get(`/image`).then((respose) => {
      console.log("Imagens retornadas: ", respose.data);
      setImages(respose.data.images);
      setOriginalData(respose.data.images);
      setMonths(respose.data.months);
      setWeeks(respose.data.weeks);
    }).catch((err) => {
      console.log('Error', err.message);
    });
  }

  const handleDownload = (image) => { 
    console.log(image)
  }

  const handleDelete = (image) => { 
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação é irreversível, após a exclusão de um arquivo não é possível recuperá-lo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7066e0',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Sim, excluir.',
      cancelButtonText: 'Não, cancelar.'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/image/${image.id}`).then((respose) => {
          console.log("Dados deletados: ", respose.data);
          window.location.reload();
        }).catch((err) => {
          console.log('Error', err.message);
        });

        Swal.fire(
          'Deletado!',
          'Arquivo deletado!',
          'success'
        )
      }
    })
  }

  const handleEdit = async () => {
    const regTemp = { originalname: filename }

    await axios.put(`/image/${idImage}`, regTemp).then((respose) => {
      console.log("Editado: ", respose.data);
      window.location.reload();
    }).catch((err) => {
      console.log('Error', err.message);
    });
  }

  const handleSearch = (value) => {
    setSearch(value);
    if (!value) setImages(originalData);

    const tempArr = [];

    originalData.forEach((data) => {
      const string = `${data.id} ${data.originalname} ${data.Usuario.name} ${moment(data.created_at).format('DD/MM/YYYY')}`;
      if (string.includes(value)) tempArr.push(data);
    });

    setImages(tempArr);
  }

  return (
    <div>
      <NavBar />

      <div className="content">
        <h1 className='Container-Title text-center mt-1 mb-3'>
          <i className='bx bx-data'></i>
          <p>DashBord</p>
        </h1>

        <div className='container border shadow rounded px-4 pb-4 pt-2 mb-5'>
          <h2 className='pt-3'>Upload de Arquivos</h2>

          <div className='pt-3'>
            <div className='DashBord-Buttons-Upload'>
              <button 
                className={`${active === 0 ? 'Buttons-Upload1' : 'Buttons-Upload1-Hover'}`}
                onClick={() => {
                  setActive(0)
                  setPanel(0)
                }}
              >
                Últimos Meses
              </button>

              <button 
                className={`${active === 1 ? 'Buttons-Upload2' : 'Buttons-Upload2-Hover'}`}
                onClick={() => {
                  setActive(1)
                  setPanel(1)
                }}
              >
                Por Semana
              </button>
            </div>

            <div className='pt-4'>
              {panel === 0 ?
                (
                  <ResponsiveContainer width='100%' height={350}>
                    <LineChart
                      width={500}
                      height={300}
                      data={months}
                      // margin={{ top: 0, left:30, right: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="uploads" stroke='#20c997' strokeWidth={4} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )
              :
                (
                  <ResponsiveContainer width='100%' height={450}>
                    <LineChart
                      width={500}
                      height={300}
                      data={weeks}
                      // margin={{ top: 0, left:30, right: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="atual" stroke='#20c997' strokeWidth={2} activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="passada" stroke='#dc3545' strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )
              }
            </div>
          </div>

          <hr className='my-3'/>

          <h2 className='pt-2 pb-3'>Arquivos (da semana atual)</h2>

          <div className='Dashbord-Search'>
            <div className="Dashbord-Search input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Pesquisar:</div>
              </div>
              <input type="text" className="form-control" 
                name='nome'
                value={search} 
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <TableContainer className='Dashbord-TableContainer'>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className='Dashbord-TableRow' align="center">Código</TableCell>
                    <TableCell className='Dashbord-TableRow' align="center">Nome</TableCell>
                    <TableCell className='Dashbord-TableRow' align="center">Url pública</TableCell>
                    <TableCell className='Dashbord-TableRow' align="center">Criado por</TableCell>
                    <TableCell className='Dashbord-TableRow' align="center">Criado em</TableCell>
                    <TableCell className='Dashbord-TableRow' align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {images.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((image) => (
                    <TableRow className='Dashbord-TableRow-Hover' key={image.id}>
                      <TableCell align='center'>{image.id}</TableCell>
                      <TableCell align='center'>{image.originalname}</TableCell>
                      <TableCell align='center'>
                        <a 
                          href={image.file_url} 
                          target="_blank"
                          title={image.file_url}
                          className="Dashbord-Link-Table"
                          rel='noopener noreferrer'
                        >
                          Visualizar
                        </a>
                      </TableCell>
                      <TableCell align='center'>{image.Usuario.name}</TableCell>
                      <TableCell align='center'>{moment(image.created_at).format('DD/MM/YYYY')}</TableCell>
                      <TableCell align='center'>
                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                          <button title='Baixar' type="button" className="Dashbord-btn btn btn-primary" onClick={() => handleDownload(image)}>
                            <span className="download material-symbols-outlined">
                              download
                            </span>
                          </button>
                          <button title='Editar' type="button" 
                            className="Dashbord-btn btn btn-warning"
                            onClick={() => {
                              setFileName(image.originalname)
                              setIdImage(image.id)
                            }}
                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                          >
                            <span className="edit_square material-symbols-outlined">
                              edit_square
                            </span>
                          </button>
                          <button title='Deletar' type="button" 
                            className="Dashbord-btn btn btn-danger"
                            onClick={() => handleDelete(image)}
                          >
                            <span className="delete material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[2, 10, 25]}
                component="div"
                className="Dashbord-TablePagination"
                count={images.length}
                rowsPerPage={rowsPerPage}
                labelRowsPerPage="Linhas por página:"
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={labelDisplayedRows}
              >
              </TablePagination>
            </TableContainer>
          </div>

        </div>
      </div>

      {/* Modal Editar Imagens */}
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Editar Nome do Arquivo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Nome:</div>
                </div>
                <input type="text" className="form-control" 
                  name='nome'
                  value={filename}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" className="Imagens-Modal-Button btn btn-secondary" data-bs-dismiss="modal">
                <i className='bx bx-subdirectory-left'></i>
                <span>Voltar</span>
              </button>
              <button 
                type="button" 
                className="Color-Green Imagens-Modal-Button btn btn-primary"
                onClick={() => handleEdit()}
                data-bs-dismiss="modal"
              >
                <i className='bx bx-save'></i>
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
