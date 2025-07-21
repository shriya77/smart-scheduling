const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

async function sendConfirmationEmail({ to, subject, body }) {
  const msg = {
    to,
    from: 'noreply@yourdomain.com',
    subject,
    text: body,
    html: `<p>${body}</p>`
  };
  await sgMail.sendMultiple(msg);
}

module.exports = { sendConfirmationEmail };
