const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url == "/") {
    const indexHtml = fs.readFileSync("./public/index.html");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(indexHtml);
    return;
  }

  if (req.url.startsWith("/css")) {
    switch (req.url) {
      case "/css/style.css":
        const css = fs.readFileSync("./public/css/style.css");
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
    }
  }

  if (req.url.startsWith("/js")) {
    switch (req.url) {
      case "/js/index.js":
        const js = fs.readFileSync("./public/js/index.js");
        res.writeHead(200, { "Content-Type": "text/javascript" });
        res.end(js);
    }
  }
});

server.listen(8080, () => {
  console.log("Listening on port 8080");
});
