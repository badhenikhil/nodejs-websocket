const WebSocket = require("ws");

module.exports = {
  connect: (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", function connection(ws) {
      ws.on("message", function message(message) {
        console.log(message.toString());
        for (const client of wss.clients) {
          if (client !== ws && client.readyState == WebSocket.OPEN)
            client.send(message.toString());
        }
      });
      ws.send("welcome client");
    });
  },
};
