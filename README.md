# Redscope_Take_Home_Assignment
I get this project on Internshala Redscope_Take_Home_Assignment, where I am implementing some logic to complete the given task.

## Take Home Assignment

### TL;DR
1. Download the code from [Google Drive](https://drive.google.com/drive/folders/1Ax-8EwtjYk_E0PWoIu6D5rzh4qJ-jGXe?usp=sharing).
2. Refer to this [Loom link](https://www.loom.com/share/77c82877c32941099a81939f59109848) to get started.

### Longer Discussion
1. Run the Node.js server by executing `npm run start`.
   - It starts an HTTP server for serving static HTML files and API endpoints.
   - It also starts a WebSocket server, which the Chrome plugin connects to.
2. Follow the steps [here](https://bashvlas.com/blog/install-chromeextension-in-developer-mode) to run the Chrome plugin in your browser.
3. Open any URL in Chrome with the plugin installed. The plugin connects to the WebSocket server at startup and attempts to reconnect every 5 seconds if WebSocket is down.
4. Interact with the webpage by moving your mouse, clicking events, filling out forms, etc.
   - Note: The current code only captures the last visited URL.
  
### Problem Statement

1. **Part 1: Allow multiple URLs to be stored and retrieved**
   - Expand the Node.js code to save each URL in its own file.
   - Modify the HTML page to display URLs based on query parameters like `?id=1` for the first URL.
   - Assume each URL received on the backend is unique.

   **Impliment Solution**
   - Files are named using the pattern: `{id}_base64encode({url})` instead of storing the URL directly inside.
   - To search for a specific URL, the system iterates through all files in the data directory. When the `id` matches with the `req.query.id`, it returns the data from that file.
   - Each URL is compared with the last visited URL, and no changes were attempted due to assumptions.

2. **Part 2: Assign sessionId to the data sent by Chrome Plugin**
   - Associate the payload data sent by Chrome with a sessionId created on the server.
   - The Chrome plugin should send a sessionId field with every payload.
   - Chrome plugin should not send data if no sessionId is available.
  
   **Impliment Solution**
   
     Web Server and Web Socket:
     Initially, I created an API route for starting the server, which would incrementally send session IDs (e.g., 1, 2, and so on). Later, I modified the code to obtain the session ID 
     from the client-side WebSocket implemented at `http://localhost:3000/`. This WebSocket notifies all connected clients to start the session. When two clients are connected, the 
     server logs "Session started" because one client provides the session ID, while the other initiates the session. I also implemented a signal `-1` to close the session.

    Chrome Plugin:
    In the Chrome plugin, I added an `onmessage` event to detect specific session messages. It listens for "setSession" with the payload ID and adds a listener to chrome.runtime. On          receiving "closeSession", it removes the `chrome.runtime` listener.

## Take Home Assignment 3

  1. Modify the HTML page or use tools like Postman to connect to the WebSocket server and send sessionId.
  2. Simulate scenarios where users click on start and stop session buttons to test functionalities.
  3. Investigate and fix issues with rrweb video not working on existing tabs when changing sessionId.

  **Impliment Solution**
  - For sending sessionId to the WebSocket server, you can modify the HTML page to include a script that establishes a WebSocket connection and sends the sessionId. Alternatively, you 
    can use tools like Postman to make WebSocket requests and send the sessionId.
  - To simulate scenarios where users click on start and stop session buttons, you can manually interact with the user interface or use automated testing tools to simulate user actions 
    and verify the functionality of the start and stop session buttons.
  - To investigate and fix issues with the rrweb video not working on existing tabs when changing sessionId, you can debug the code to identify any potential issues related to sessionId 
    handling, WebSocket communication, or rrweb configuration. Once identified, you can implement appropriate fixes to address the issue.

### Bonus Points, Part 4
  - Show sessionId in the Chrome plugin options page.

**Impliment Solution**   
  - To display the sessionId in the Chrome plugin options page, modifications need to be made in both the HTML of the options page `(options.html)` and the plugin's background script 
    `(background.js)`. In the HTML file, a section or element needs to be added where the sessionId will be shown. For example, a `<div>` with an ID such as "session-id-section" and a 
    `<span>` element for displaying the sessionId can be included. In the background script, the sessionId can be retrieved from local storage using Chrome's storage API. This retrieved 
    sessionId can then be dynamically inserted into the appropriate element in the options page HTML. Additionally, ensure that the sessionId is stored in local storage whenever it is 
    updated or retrieved, ensuring consistency between the plugin and the options page. By implementing these changes, the sessionId will be prominently displayed on the Chrome plugin 
    options page, providing users with convenient access to this information. Adjustments to the code may be necessary based on the specific requirements and structure of the plugin.

## Contributing

   [coding-saga]

## Thank You

   Lastly, I want to express my heartfelt gratitude for the opportunity to work on this assignment. I have learned a lot from this experience and am grateful for the chance to explore 
   something new beyond the usual node.js routes.
   

    
