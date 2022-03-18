// 'use strict';
const fs = require('fs');
const http = require('http');
const sendEmail = require('./sendEmail');

require('dotenv').config();

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  if (req.url === '/' && req.method === 'GET') {
    return res.end(`

    <h1>Pagina de bienvenida</h1>

    <a href="/crear-archivo">Crear Archivo</a>
    <br />
    <br />
    <a href="/mandar-archivo">Mandar Archivo</a>

    `);
  } else if (req.url === '/crear-archivo' && req.method === 'GET') {
    return res.end(`

    <h1>Crear Archivo</h1>


    <form action="crear-archivo" method="POST">
      <label for="nombreArchivo">Ingrese el nombre del archivo</label>
      <input type="text" name="nombreArchivo" placeholder="nombreArchivo" />
      <br />
      <br />
      <label for="contenidoArchivo">Ingrese el contenido del archivo</label>
      <input type="text" name="contenidoArchivo" id="contenidoArchivo" placeholder="contenidoArchivo" />

      <br />
      <br />

      <input type="submit" value="Crear Archivo" />
    </form>

    `);
  } else if (req.url === '/mandar-archivo' && req.method === 'GET') {
    return res.end(`

    <h1>Mandar Correo</h1>

    `);
  } else if (req.url === '/crear-archivo' && req.method === 'POST') {
    // get data inputs

    // console.log(req.);

    let postData = '';
    // Get all post data when receive data event.
    req.on('data', function (chunk) {
      // postData += chunk;
      // console.log();
      const data = chunk.toString();

      // const nombreArchivo = data.split('=')[1].split('&')[0];

      // const contenidoArchivo = data.split('=')[2].split('&')[0];

      // console.log(nombreArchivo);
      // console.log(contenidoArchivo);

      const [contenidoArchivo2, nombreArchivo2] = data.split('=');
      console.log(nombreArchivo2, '\n', contenidoArchivo2.split('&')[0]);
    });

    req.on('end', function () {
      console.log(postData);

      // console.log('Client post data : ' + postData);

      // Parse the post data and get client sent username and password.
      // var postDataObject = JSON.parse(postData);
    });

    res.end('Archivo creado');
  } else {
    return res.end('404: File Not Found');
  }

  // try {
  //   // fs.existsSync('./archivess/prueba.txt');
  //   // verify exist archive
  //   if (!fs.existsSync('./archives/prueba.txt')) {
  //     // res.statusCode = 500;
  //     throw {
  //       status: false,
  //       message: 'Archivo no existe',
  //     };
  //   }

  //   //   send email and response
  //   const { status, message } = await sendEmail();
  //   // res.statusCode = status;
  //   return res.end(`${message}`);
  // } catch (error) {
  //   console.log(error);
  //   // res.statusCode = error.status;
  //   return res.end(`${error.message}`);
  // }
});

server.listen(8080, function () {
  console.log('Server running at port 8080');
});
