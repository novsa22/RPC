///////////////////////////
// Aayu5h and Sahil
// https://discord.gg/uepgJzsf6n
// https://spicydevs.me/
///////////////////////////

const express = require("express");
const server = express();

server.all("/", (req, res) => {
  res.send(``);
});

function keepAlive() {
  server.listen(3000, async () => {
   await console.log("Server Online ✅!!");
  });
}

module.exports = keepAlive;
