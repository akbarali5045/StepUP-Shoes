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
    console.log("Subject:", subject);
console.log("Receiver:", receiver);
console.log("Body exists:", !!body);

console.log("HOST:", process.env.NODEMAILER_HOST);
console.log("PORT:", process.env.NODEMAILER_PORT);
console.log("EMAIL:", process.env.NODEMAILER_EMAIL);
console.log("PASSWORD:", process.env.NODEMAILER_PASSWORD ? "Exists" : "Missing");
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