const axios = require('axios');
const fs = require('fs');

const imagePath = 'C:\\Users\\eddii\\Desktop\\Captura.JPG';

fs.readFile(imagePath, (err, data) => {
  if (err) {
    console.error('Error al leer la imagen:', err);
    return;
  }

  const url = 'http://localhost:3000/upload/local';
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  axios.post(url, data, { headers })
    .then(response => {
      console.log('La imagen se ha cargado con éxito:', response.data.imageUrl);
    })
    .catch(error => {
      console.error('Error al cargar la imagen:', error);
    });
});
