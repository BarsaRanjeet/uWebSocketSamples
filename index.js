const uWS = require('uWebSockets.js')
const port = 9001;
const app = uWS.App()

app.ws('/*', {
    /* Options */
    compression: uWS.SHARED_COMPRESSOR,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    maxBackpressure: 1024,
  
    /* Todo, Setting 1: merge messages in one, or keep them as separate WebSocket frames - mergePublishedMessages */
    /* Todo, Setting 4: send to all including us, or not? That's not a setting really just use ws.publish or global uWS.publish */
  
    /* Handlers */
    open: (ws) => {
      /* Let this client listen to all sensor topics */
      console.log("client connected!!")
      ws.subscribe('home/sensors/#');
    },
    message: (ws, message, isBinary) => {
        var messageString = new TextDecoder("utf-8").decode(message)
        console.log(messageString)
        ws.send(message)
    },
    drain: (ws) => {
  
    },
    close: (ws, code, message) => {
      /* The library guarantees proper unsubscription at close */
      console.log("client disconnected!!")
    }
  }).any('/*', (res, req) => {
    res.end('Nothing to see here!');
  }).listen(port, (token) => {
    if (token) {
      console.log('Listening to port ' + port);
    } else {
      console.log('Failed to listen to port ' + port);
    }
  });