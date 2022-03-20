const {
  createFile,
  verifyIfExistsFile,
  getFilesFolder,
} = require('./helperFiles');
const sendEmail = require('./sendEmail');

const rutaPaginaBienvenida = () => {
  return `

    <h1>Pagina de bienvenida</h1>

    <a href="/crear-archivo">Crear Archivo</a>
    <br />
    <br />
    <a href="/mandar-archivo">Mandar Archivo</a>

    `;
};

const rutaPaginaCrearArchivo = () => {
  return `

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
      <input type="button" onclick="history.back()" name="volver atras" value="volver atras">

    </form>

    `;
};

const rutaCrearArchivo = (chunk) => {
  // recibir datos del formulario
  const data = chunk.toString();

  const nombreArchivo = data.split('=')[1].split('&')[0];

  const contenidoArchivo = data.split('=')[2].split('&')[0];

  // verificar si los datos envíados son correctos
  if (nombreArchivo === '' || contenidoArchivo === '') {
    return `Se requiere el nombre del archivo y el contenido del archivo
    <input type="button" onclick="history.back()" name="volver atras" value="volver atras">`;
  }

  // verificar si el archivo ya existe

  if (verifyIfExistsFile(nombreArchivo)) {
    return `
    El archivo "${nombreArchivo}" ya existe
     <input type="button" onclick="history.back()" name="volver atras" value="volver atras">
    `;
  }

  // crear archivo

  if (!createFile(nombreArchivo, contenidoArchivo)) {
    return `
      Error al crear el archivo => ${nombreArchivo}
        <input type="button" onclick="history.back()" name="volver atras" value="volver atras">
      `;
  }

  return `Archivo creado con exito
        <input type="button" onclick="history.back()" name="volver atras" value="volver atras">`;
};

const rutaPaginaEnviarCorreo = () => {
  const totalFiles = getFilesFolder('./archives');

  console.log(totalFiles);

  const selectItems = totalFiles.map((item) => {
    return `<option value="${item}">${item}</option>`;
  });

  return `

    <h1>Mandar Correo</h1>

    <form action="mandar-archivo" method="POST">

        <label for="nombreArchivo">Seleccione el archivo</label>
        <select name="nombreArchivo" id="nombreArchivo">
            ${selectItems.join('')}
        </select>

        <br />

        <input type="submit" value="Mandar Correo" />
        <input type="button" onclick="history.back()" name="volver atras" value="volver atras">

    `;
};

const rutaEnviarCorreo = async (chunk) => {
  const data = chunk.toString();

  const nombreArchivo = data.split('=')[1].split('&')[0].split('.txt')[0];

  try {
    // verify exist archive

    if (!verifyIfExistsFile(nombreArchivo)) {
      throw {
        status: false,
        message: 'Archivo no existe',
      };
    }
    //   send email and response
    const { status, message } = await sendEmail(nombreArchivo);
    return `
      ${message}
        <input type="button" onclick="history.back()" name="volver atras" value="volver atras">
      `;
  } catch (error) {
    // console.log(error);
    return `
      ${error.message}
      <input type="button" onclick="history.back()" name="volver atras" value="volver atras">

      `;
  }
};

const rutaNotFound = () => {
  return '404: File Not Found';
};

module.exports = {
  rutaPaginaBienvenida,
  rutaPaginaCrearArchivo,
  rutaCrearArchivo,
  rutaEnviarCorreo,
  rutaPaginaEnviarCorreo,
  rutaNotFound,
};
