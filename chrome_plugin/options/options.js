var sessionBox = document.getElementById('sessionBox');

chrome.storage.local.get('sessionId', (result)=>{
    const {sessionId} = result
    sessionBox.textContent = sessionId;
});