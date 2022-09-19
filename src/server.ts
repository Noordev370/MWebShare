import express, { Request, Response } from 'express';
import path from 'path';
import utils from './utils';

const app = express();

app.get('/', (req: Request, res: Response) => {
  // use path.resolve to convert the relative path to absolute path & pass it to sendfile
  res.sendFile(path.resolve('./frontend/index.html'));
});

app.get('/api/getURLs', async (req: Request, res: Response) => {
  const result = await utils.getFiles();
  res.json(result);
});

app.get('/api/download/:filename', (req: Request, res: Response) => {
  try {
    const fileName = req.params.filename;
    res.download(`./ToShare/${fileName}`);
  } catch (error) {
    throw new Error(`Something wrong while downloading file:  ${error}`);
  }
});

app.use('/static', express.static('./frontend'));
app.listen(8000, () => console.log(`started at http://localhost:8000/`));
