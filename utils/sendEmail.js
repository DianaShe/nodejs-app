const sg = require('@sendgrid/mail')

const {SENDGRID_API_KEY} = process.env;

sg.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    email = {...data, from:"dikravchyk@gmail.com"}
    await sg.send(email);
    return true
}

module.exports = sendEmail