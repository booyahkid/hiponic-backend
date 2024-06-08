
const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    auth: {
        user: process.env.HIPONIC_EMAIL,
        pass: process.env.HIPONIC_PW
    }
});

async function send_alert(){
    try{
        const user_email = process.env.USER_EMAIL;
        const mailOptions = {
            to: 'fawwazanricopurnomo@gmail.com',
            from: process.env.HIPONIC_EMAIL,
            subject: 'HIPONIC DEVICE ALERT',
            text: `There are some problems with your device sensors \n\n
            Please email us and we will make an appointment with our technician\n\n
            Thank You`
        };
        await transporter.sendMail(mailOptions);
    }catch(error){
        throw new Error("failed to send email");
    }
}
module.exports = send_alert;