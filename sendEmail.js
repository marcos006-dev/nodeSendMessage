const nodemailer = require('nodemailer');
const path = require('path');

module.exports = function () {
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
      to: 'lonytmp+guehm@gmail.com',
      //   subject: `${date.toLocaleDateString()}`,
      html: `Envio de archivo de texto`,
      attachments: [
        {
          filename: `prueba.txt`,
          path: path.join(__dirname, `./archives/prueba.txt`),
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
