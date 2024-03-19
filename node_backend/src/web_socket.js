import { WebSocketServer } from 'ws';
import fs from 'fs-extra';
import { dataFolderName } from './constants.js'
import path from "path";
import  {v4 as uuidv4}  from 'uuid';



const clients = new Map();
const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 3008 });
  wss.on('connection', (ws) => {
    const sessionId = uuidv4();
    
    clients.set(ws, sessionId);
    console.log('WebSocket connection established.');

    
      
      ws.send(JSON.stringify({sessionId}));

    // Handle incoming messages
    ws.on('message', (message) => {
      const payload = JSON.parse(message.toString());
      processPayload(payload);
    });

    ws.on('close', ()=>{
      clients.set(ws, sessionId);
      console.log('WebSocket connection disconnected')
    })
  });
};


let lastUrl =[];

const processPayload = (payload) => {
  const { type, url, data, sessionId} = payload;
  console.log("*".repeat(80));
  console.log( {type, url, payload} );
  console.log("*".repeat(80));

  if (type !== 'rrweb events') {
    return;
  }
  const jsonData = JSON.parse(data);
  let dataFilePath;
  let currentIndex = lastUrl.findIndex((thisurl)=>{return thisurl === url} );
  if (currentIndex != -1 ) { // Simply append to the same file;  No change
    dataFilePath = path.join(dataFolderName, (++currentIndex).toString());
    fs.writeJsonSync(dataFilePath, jsonData, { flag: 'a' });
  } else {

    lastUrl.push(url);
    dataFilePath = path.join(dataFolderName, (currentIndex+2).toString());
    fs.writeJsonSync(dataFilePath, jsonData); 
// This would empty the files if there's already content
  }
};


export {
  startWebSocketServer,
};
