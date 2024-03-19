import express from 'express';
import fs from "fs";
import path from 'path';
import { dataFolderName } from './constants.js'

const __dirname = path.resolve();


const startHttpServer = () => {
  const app = express();
  app.use(express.static('public'));

  app.get('/', (req, res)=>{
    req.sendFile((__dirname + '/public/index.html'))
  })

  app.get('/rrweb-events', (req, res) => {
    res.sendFile((__dirname + '/public/rrweb_events.html'));
  });

  // Nested routing (api/rrweb_events) is a bit tricky, leaving for the take home assignment
  app.get('/api-rrweb-events', (req, res) => {
    return res.send(fetchRrwebEvents(req.query.id));
  });

  const port = 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}

const fetchRrwebEvents = (id) => {
  const dataFilePath = path.join(dataFolderName, id.toString())
  const rrwebEvents = fs.readFileSync(dataFilePath, 'utf-8');
  return rrwebEvents.split("\n").filter(line => line.length > 0).map(ff => JSON.parse(ff));
}

export {
  startHttpServer
}
