/**
 * @implNote
 * 1. We could have imported a web_socket client here, and directly interacted with it.  There is a big problem
 * with that approach - hence we reverted, and now allowing only background script to talk over web socket:
 *
 *  We would have a content script injected into all the pages ==> we would have as many web_socket connections
 * as we have tabs open
 * 2. And sending message to background script is very trivial.  Its the background script which talks to
 * web socket
 */



  rrweb.record({
    emit(event) {
      const url = window.top.location.href;
      const payload = {
        url: url,
        type: 'rrweb events',
        data: JSON.stringify(event),
      }
  
      // Send message to background script
      chrome.runtime.sendMessage(payload);
    }
  });


var button=document.getElementsByClassName('websocket')

button[0].addEventListener('click', ()=>{
  chrome.runtime.sendMessage({action: "connectToWebSocket"});
})

button[1].addEventListener('click', ()=>{
  chrome.runtime.sendMessage({action: "diconnectFromWebSocket"});
})

