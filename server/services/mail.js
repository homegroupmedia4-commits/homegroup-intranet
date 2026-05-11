const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

const sendQrsEmail = async (qrs) => {
  const author = qrs.isAnon
    ? "Anonyme"
    : `${qrs.prenom} ${qrs.nom}`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: "homegroupworld@gmail.com",
    subject: `📩 Nouvelle contribution (${qrs.category})`,
    html: `
      <h3>Nouvelle contribution</h3>
      <p><b>Auteur:</b> ${author}</p>
      <p><b>Catégorie:</b> ${qrs.category}</p>
      <p>${qrs.message}</p>
    `
  });
};

const sendResetPasswordEmail = async (email, token) => {

  const url = `${process.env.FRONT_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Réinitialisation mot de passe",
    html: `
      <h2>Réinitialisation mot de passe</h2>

      <p>
        Cliquez ici :
      </p>

      <a href="${url}">
        ${url}
      </a>
    `
  });
};



module.exports = { sendQrsEmail,
  sendResetPasswordEmail };
