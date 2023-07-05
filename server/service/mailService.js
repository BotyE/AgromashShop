const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
    async sendOrderChanged(to, status, id) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Изменен статус заказа',
            text: '',
            html:
                `
                    <div>
                        <h1>Статус заказа №${id} изменен на "${status}"</h1>
                    </div>
                `
        })
    }

    async sendOrder(order) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: order.individual.email,
            subject: 'Оформление заказа на ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Спасибо за оформление заказа.</h1>
                        <p>Состав заказа:</p>
                        ${order.device_list.map( elem => `<p>${elem.name} - ${elem.basket_count}</p>`)}
                        <p>Общая сумма заказа: ${order.sum}</p>
                    </div>
                `
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'Оформлен заказ на ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <p>ФИО: ${order.individual.fio}</p>
                        <p>Почта: ${order.individual.email}</p>
                        <p>Телефон: ${order.individual.phone}</p>
                        <p>Заказ оформлен: ${!order.company ? 'Как юр. лицо' : 'Как физ. лицо'}</p>
                        <p>Состав заказа:</p>
                        ${order.device_list.map( elem => `<p>${elem.name} - ${elem.basket_count}</p>`)}
                        <p>Общая сумма заказа: ${order.sum}</p>
                    </div>
                `
        })
    }
    async sendRecoveryMail(to, link) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Восстановление пароля на ' + process.env.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для востановления пароля перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendFeedbackMail(email, phone, text, fio) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'Обращение от' + fio,
            text: '',
            html:
                `
                    <div>
                        <p>ФИО: ${fio}</p>
                        <p>Почта: ${email}</p>
                        <p>Телефон: ${phone}</p>
                        <p>Текст обращения: ${text}</p>

                    </div>
                `
        })
    }

    async sendUnderOrderMail(email, phone, product, fio) {
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            subject: 'Товар под заказ от ' + fio,
            text: '',
            html:
                `
                    <div>
                        <p>ФИО: ${fio}</p>
                        <p>Почта: ${email}</p>
                        <p>Телефон: ${phone}</p>
                        <p>Товар под заказ: ${product}</p>

                    </div>
                `
        })
    }
}

module.exports = new MailService();