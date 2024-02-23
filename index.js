import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.post('/', (req, res) => {
    const { name, email, message } = req.body;
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hatem.bassah@gmail.com',
            pass: 'crew csbo pkqb igmc'
        }
    });

    const mail = {
        from: email,
        to: 'hatem.bassah@gmail.com',
        subject: `Message from ${name}`,
        text: `${message}`
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            return console.error(error);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
