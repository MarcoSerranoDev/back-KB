const nodemailer = require("nodemailer");
const Register = require("../models/register");

const sendEmail = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newRegister = new Register(req.body);
    await newRegister.save();
    contentHTML = `
    <div>
        <h2>Hello ${name}</h2>
        <p>Go to the following link to download styles for your KBoard:</p>
        <a href="https://www.kboardmusic.com/descarga/">Download</a>
    </div>
  `;
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"KBoard Music" <info@kboardmusic.com>', // sender address,
      to: `${email}`,
      cc: "info@kboardmusic.com",
      subject: "Download styles KBOARD",
      html: contentHTML,
    });
    res.status(200).json(`E-mail send with de id: ${info.messageId}`);
  } catch (error) {
    next(error);
  }
};

const sentMeMail = async (req, res, next) => {
  const { name, email, message, phone } = req.body;
  try {
    contentHTML = `
    <div style="background:#000; padding:30px; color: #FFF; width:100%; max-width:560px" >
        <img
          style="width:100%; max-width:500px; margin:auto"
          src="https://i.ibb.co/PgYJtp0/logo.png"
          alt="icono kboard"
        />
        <h2
          style="font-size: 20px; margin-bottom: 20px; color: #fff"
        >
          ${name} se quiere contactar
        </h2>
        <p>
          <b>Email:</b> ${email}
        </p>
        <p>
          <b>Numero:</b> ${phone}
        </p>
        <p>
          <b>Mensaje:</b> ${message}
        </p>
      </div>
  `;
    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"KBoard Music" <info@kboardmusic.com>', // sender address,
      to: "info@kboardmusic.com",
      cc: "salvador.gongora@hermes-music.com.mx",
      subject: "Usuario Kboard quiere contactarse",
      html: contentHTML,
    });
    res.status(200).json(`E-mail sended to me with de id: ${info.messageId}`);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendEmail, sentMeMail };
