// 'use strict';
const http = require('http');
const {
  rutaPaginaBienvenida,
  rutaPaginaCrearArchivo,
  rutaCrearArchivo,
  rutaNotFound,
  rutaPaginaEnviarCorreo,
  rutaEnviarCorreo,
} = require('./routes');

require('dotenv').config();

const configServer = async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  const URL = req.url;
  const METODO = req.method;
  // ruta de la pagina de bienvenida
  if (URL === '/' && METODO === 'GET') {
    return res.end(rutaPaginaBienvenida());
  }
  // ruta de la pagina de crear archivo
  if (URL === '/crear-archivo' && METODO === 'GET') {
    return res.end(rutaPaginaCrearArchivo());
  }
  // ruta de la creacion de archivo
  if (URL === '/crear-archivo' && METODO === 'POST') {
    req.on('data', function (chunk) {
      return res.end(rutaCrearArchivo(chunk));
    });
  }
  // ruta de la pagina de enviar correo
  if (URL === '/mandar-archivo' && METODO === 'GET') {
    return res.end(rutaPaginaEnviarCorreo());
  }

  // ruta para enviar el correo con el archivo adjunto
  if (URL === '/mandar-archivo' && METODO === 'POST') {
    req.on('data', async function (chunk) {
      return res.end(await rutaEnviarCorreo(chunk));
    });
  }

  // ruta para mostrar la pagina de error
  return res.end(rutaNotFound());
};

const server = http.createServer(configServer);

server.listen(8080, function () {
  console.log('Server running at port 8080');
});
