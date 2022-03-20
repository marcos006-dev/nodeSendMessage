const nodemailer = require('nodemailer');
const path = require('path');

module.exports = function (nombreArchivo) {
  return new Promise(function (resolve, reject) {
    // config mail
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_CORREO,
        pass: process.env.USER_PASSWORD,
      },
    });

    // read file and send
    let mailOptions = {
      from: 'francomarcos416@gmail.com',
      to: 'nekofa3084@siberpay.com',
      //   subject: `${date.toLocaleDateString()}`,
      html: `Archivo enviado: ${nombreArchivo}`,
      attachments: [
        {
          filename: `${nombreArchivo}`,
          path: path.join(__dirname, `./archives/${nombreArchivo}.txt`),
          contentType: 'text/plain',
        },
      ],
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        // console.log(err);
        reject({ status: false, message: 'No se pudo enviar el correo :(' });
      } else {
        resolve({ status: true, message: 'Correo enviado correctamente' });
        // console.log(info);
      }
    });
  });
};
