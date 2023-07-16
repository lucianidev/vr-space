const nodemailer = require('nodemailer');

module.exports = class Email {
    constructor(subject, attachements, content, receiver, email, password) {
        this.subject = subject;
        this.attachements = attachements;
        this.content = content;
        this.receiver = receiver;
        this.email = email;
        this.password = password;
        this.transporter;
    }

    init() {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: this.email,
                pass: this.password,
            }
        })
        this.transporter = transporter;
    }

    async sendEmail() {
        console.log(this.attachements);
        await this.transporter.sendMail({
            from: this.email,
            to: this.receiver,
            subject: this.subject,
            html: this.content,
            attachments : this.attachements.map(attachment => {
                return {
                    filename : `download.jpg`,
                    content : attachment,
                }
            })
        })
    }

    setSubject(subject) {
        this.subject = subject;
        return this;
    }

    setAttachements(attachements) {
        this.attachements = attachements;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    setReceiver(receiver) {
        this.receiver = receiver;
        return this;
    }

    setEmail(email) {
        this.email = email;
        return this;
    }

    setPassword(password) {
        this.password = password;
        return this;
    }
}