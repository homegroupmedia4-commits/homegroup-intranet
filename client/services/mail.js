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
      <h3>Nouvelle contribution reçue</h3>
      <p><strong>Auteur :</strong> ${author}</p>
      <p><strong>Catégorie :</strong> ${qrs.category}</p>
      <p><strong>Message :</strong></p>
      <p>${qrs.message}</p>
    `
  });
};

module.exports = { sendQrsEmail };
