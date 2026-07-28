import nodemailer from 'nodemailer'
export const sendMail = async (subject, receiver, body) => {
    const trasporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: false,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        }
    })

    const options = {
        from: `"Developer Goswami" <${process.env.NODEMAILER_EMAIL}>`,
        to: receiver,
        subject: subject,
        html: body
    }
    try {
    const info = await trasporter.sendMail(options);

    console.log("Email Sent:", info.response);

    return {
        success: true,
    };
} catch (error) {
    console.error("Email Error:", error);

    return {
        success: false,
        message: error.message,
    };
}
}