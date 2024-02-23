import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));
app.use('/images', express.static(join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.post('/Personal-CV/submit', (req, res) => {
    const { email, message } = req.body;
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
        subject: '',
        text: `${message}`
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            return console.error(error);
        }
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
