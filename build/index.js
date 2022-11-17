"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
async function sendFile(response, fileName) {
    return await response.contentType('application/pdf').sendFile(`./files/${fileName}.pdf`, { root: __dirname }, (err) => {
        try {
            console.log('Arquivo enviado');
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            if (err)
                console.log(err);
        }
    });
}
app.get('/pdf/:id', (req, res) => {
    const { id } = req.params;
    if (!id || id !== '1' && id !== '2') {
        console.error('There is no id, please insert one');
        res
            .status(404)
            .send('There is no file with this id, please insert one right');
        return;
    }
    if (id === '1') {
        sendFile(res, 'pdf01');
    }
    if (id === '2') {
        sendFile(res, 'pdf02');
    }
});
app.listen(process.env.PORT, () => console.log(`Project is running on ${process.env.PORT} 🐱‍🏍`));
