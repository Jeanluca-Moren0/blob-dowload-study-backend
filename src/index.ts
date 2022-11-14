import express from 'express';
import { config } from 'dotenv';

import cors from 'cors';

config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

function sendFile(response: express.Response, fileName: string) {
  return response.contentType('application/pdf').sendFile(
    `./files/${fileName}.pdf`,
    { root: __dirname },
    (err) => {
      try {
        console.log('Arquivo enviado');
      } catch (error: any) {
        throw new Error(error);
      } finally {
        if (err) console.log(err);
      }
    }
  );
}

app.get('/pdf/:id', (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  if (!id && id !== '1' && id !== '2') {
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

app.listen(process.env.PORT, () =>
  console.log(`Project is running on ${process.env.PORT} 🐱‍🏍`)
);
