const express = require("express");
const path = require("path");
const server = express();

// Menggunakan middleware express.static untuk menangani file statis di folder 'public'
server.use(express.static(path.join(__dirname, "public")));

server.all("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

function keepAlive() {
  server.listen(3000, async () => {
    await console.log("SERVER ONLINE !!");
  });
}

module.exports = keepAlive;
