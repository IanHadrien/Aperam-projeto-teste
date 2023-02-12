import React, { useEffect, useState } from 'react'
import './Images.css';
import { NavBar } from '../../components/NavaBar/NavBar'
import { BsPlusCircle } from 'react-icons/bs';
import { ImageList, ImageListItem } from '@mui/material';
import moment from 'moment/moment';
import axios from '../../services/axios';
import Alert from '@mui/material/Alert';
import { uniqueId } from 'lodash';
import { filesize } from 'filesize';
import Dropzone from 'react-dropzone';

export const Images = () => {
  const [images, setImages] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [date, setDate] = useState(false);

  const userId  = localStorage.getItem("id")

  useEffect(() => {
    handleSearch(moment().format('YYYY-MM-DD'));
  }, []);

  const handleSearch = async (value) => {
    const querys = new URLSearchParams({
      date: value,
    }).toString();
    setDate(value);

    const response = await fetch(
      `http://localhost:3333/image/search/${querys}`,
    );
    const json = await response.json();
    console.log(json);
    setImages(json);
  };

  const handleUploads = (files) => {
    const uploadedFiles = files.map((file) => ({
      id: uniqueId(),
      file,
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
      user_id: userId,
    }));

    console.log(uploadedFiles);
    setUploads(uploads.concat(uploadedFiles));
  };

  const handleUpload = async () => {
    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    for (const upload of uploads) {
      const formData = new FormData();
      formData.append('file', upload.file);
      formData.append('user_id', userId);

      await axios.post(`/image`, formData, header).then((respose) => {
        console.log("Salvar Imagens: ", respose.data);
      }).catch((err) => {
        console.log('Error', err.message);
      });
    }
    handleSearch(moment().format('YYYY-MM-DD'));
  };

  return (
    <div>
      <NavBar />

      <div className="content">
        <h1 className='Container-Title text-center mt-1 mb-3'>
          <i className='bx bxs-image'></i>
          <p>Galeria de Fotos</p>
        </h1>

        <div className='Image-Button-Container'>
          <button type="button" 
            className="btn btn-primary Image-Button-add"
            data-bs-toggle="modal" data-bs-target="#exampleModal"
          >
            <BsPlusCircle size={20}/>
            <span>Adicionar foto</span>
          </button>
        </div>

        <div className='container border shadow rounded px-4 pb-4 pt-2 mb-5'>
          <div className="input-group mb-2 mr-sm-2 w-50">
            <div className="input-group-prepend">
              <div className="input-group-text">Dia:</div>
            </div>
            <input type="date" className="form-control" 
              name='date'
              value={date}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <ImageList variant="masonry" cols={3} gap={8}>
            {images?.map((image) => (
              <ImageListItem key={image.id}>
                <a href={image.file_url} className="Images-Url" target="_blank" title="Acessar" rel="noreferrer">
                  <span 
                    className="Images-OriginalName">
                      {image.originalname}
                    </span>
                  <img src={image.file_url} alt="" loading="lazy" />
                </a>

              </ImageListItem>
            ))}
          </ImageList>

          { images.length <= 0 &&
          <Alert variant="outlined" severity="warning">
            Nehuma foto cadastrada neste dia
          </Alert> }
        </div>
      </div>

      {/* Modal de Adicionar Imagens */}
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Cadastrar Foto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              <Dropzone onDropAccepted={handleUploads}>
                {({
                  getRootProps, getInputProps, isDragActive, isDragReject,
                }) => (
                  <div
                    className={`${isDragActive && 'active '} ${isDragReject && ' reject '} dropzone Images-Dropzone`}
                    {...getRootProps()}
                    isdragactive={isDragActive.toString()}
                    isdragreject={isDragReject.toString()}
                  >
                    <input {...getInputProps()} />
                    Arraste arquivos para dentro da área pontilhada para fazer o upload.
                    <br />
                    <button className="Images-DropZone-Selecionar">
                      Selecionar Arquivos
                    </button>
                  </div>
                )}
              </Dropzone>

              {!!uploads.length && (
              <div className="Images-Grid-Upload">
                {uploads.map((file) => (
                  <div key={file.id} className="Images-Upload">
                    <img src={file.preview} className="Images-Heigth" alt="" />
                  </div>
                ))}
              </div> )}
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
                onClick={handleUpload}
                data-bs-dismiss="modal"
              >
                <i className='bx bx-save'></i>
                <span>Salvar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
