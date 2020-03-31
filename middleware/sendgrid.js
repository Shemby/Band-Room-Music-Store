const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');

sgMail.setApiKey(keys.sendgridKey);

const sendInquiryEmail = data => {
  const { email, first, last, phone, address, message, subject } = data;
  sgMail.send({
    to: keys.email,
    from: email,
    subject,
    text: `See the below customer details:

            Name: ${first} ${last}
            Phone: ${phone}
            Mailing: ${address}
            Message: ${message}`
  });
};

module.exports = {
  sendInquiryEmail
};
