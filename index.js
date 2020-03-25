var fs = require("fs");
var http = require("http");

var form = `<form action="/message" method="post">
<input type="text" name="message" placeholder="Type your Message"><br>
<button type="submit">Submit</button>
</form>`;

var server = http.createServer((req, res) => {
  var pathName = req.url;
  if (pathName === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
    res.end(form, () => console.log("Successfully wrote form on page"));
      } else if (pathName === "/message" && req.method === "POST") {
          var data = "";
                  req.on("data", chunk => {
                        data += chunk;
                              var msg = data.split("+").join(" ");
      var message = msg.substring(16, msg.length);
            fs.writeFile("./message.txt", message, function (err) {
                  if (err) throw err;
});
                          });
     req.on("end", () => {
        res.writeHead(200, { "Content-Type": "text/plain" });
           res.end("Message submitted successfully");
                       });
                   }
                      }).listen(8080, () =>
  console.log("Server listening on port 8080")
  );
