const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  const { name, email } = req.body;
  try {
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
      subject: "Download slyles KBOARD",
      html: contentHTML,
    });
    res.status(200).json(`E-mail send with de id: ${info.messageId}`);
  } catch (error) {
    next(error);
  }
};

const sentMeMail = async (req, res, next) => {
  const { name, email, message, phone} = req.body;
  try {
    contentHTML = `
    <div>
        <h2>${name} se quiere contactar</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Numero:</b> ${phone}</p>
        <p><b>Mensaje:</b> ${message}</p>
        
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
      subject: "Mensaje contacto",
      html: contentHTML,
    });
    res.status(200).json(`E-mail sended to me with de id: ${info.messageId}`);
  } catch (error) {
    next(error);
  }
}

module.exports = { sendEmail, sentMeMail };
