const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("You are on the home page!");
    res.end();
  } else if (req.url === "/another") {
    res.write("You are on the another route");
    res.end();
  } else {
    res.write("The server is listening!");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("The server has started!");
});
