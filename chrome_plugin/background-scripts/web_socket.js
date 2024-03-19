 export let webSocket = null;
let intervalId = null;
let sessionId = null

function connectToWebSocket() {
  webSocket = new WebSocket('ws://localhost:3008');
  webSocket.onopen = () => {
    console.log('WebSocket connected');
    changeIcon("../icons/server_up.png");

  };
  webSocket.onerror = (err) => {
    console.error('WebSocket error:', err);
    changeIcon("../icons/server_down.png");
  };

  webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.sessionId) {
      sessionId = message.sessionId;
      chrome.storage.local.set({sessionId});
    }
}

//disconnect from WebSocket connection
}
function disconnectFromWebSocket() {
  if (webSocket) {
    webSocket.close();
    console.log('WebSocket disconnected');
    changeIcon("../icons/server_down.png");
    chrome.storage.local.remove('sessionId');
  } else {
    console.log('WebSocket is not connected');
    changeIcon("../icons/server_down.png");
    chrome.storage.local.remove('sessionId');
  }
}

// Initial connection attempt


// Reconnect every 5 seconds if not connected


// Message listener from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "connectToWebSocket") {
    connectToWebSocket();
    intervalId = setInterval(() => {
      if (webSocket === null || webSocket.readyState !== WebSocket.OPEN) {
        connectToWebSocket();
      }
    }, 5000);
  }

  if(message.action === "diconnectFromWebSocket"){
    disconnectFromWebSocket();
    clearInterval(intervalId);
  }

  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    console.log( {payload: message.toString()});
    webSocket.send(JSON.stringify({...message, sessionId}));
  } else {
    console.log('WebSocket not ready, data ignored');
  }
});


function changeIcon(imageIcon) {
  chrome.action.setIcon({ path: imageIcon });
}

