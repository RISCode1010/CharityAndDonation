const nodemailer = require("nodemailer");


const sendEmail = async (val)=>{

    // console.log("A");
    const transporter = nodemailer.createTransport({
        host : process.env.HOST,
        service: 'gmail',
        port: "587",
        authentication: 'plain',
        secure: false,
        // tls: {
        //     ciphers: "SSLv3",
        //     rejectUnauthorized: false,
        // },
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 5 * 60 * 1000
    })

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    // console.log("B");
    const mail = {
        from: process.env.EMAIL_FROM,
        to: val.to,
        subject: val.subject,
        html: val.text
    };
    // console.log("C");
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mail, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });

    // await transporter.sendMail(mail,function(err,info){
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(info);
    //     }
    // });
}

module.exports = sendEmail;