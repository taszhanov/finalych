const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use('/', express.static(path.join(__dirname, '/script')));
app.use('/about/', express.static(path.join(__dirname, '/photo/')));
app.use('/video/', express.static(path.join(__dirname, '/video/')));


app.get("/", function(request, response){
    response.sendFile(path.join(__dirname + '/index.html'));
});


app.get("/about", function(request, response){
    response.sendFile(path.join(__dirname + '/about.html'));
});


app.get("/about/team_photo", function(request, response){
    response.sendFile(path.join(__dirname + '/photo/photo.jpg'));
});

app.get('/video', function(request, response) {
  const path = 'video/video.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = request.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    response.writeHead(206, head);
    file.pipe(response);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    response.writeHead(200, head)
    fs.createReadStream(path).pipe(response)
  }
});


app.get("*", function(request, response){
    response.sendFile(path.join(__dirname + '/notfound.html'));
});


console.log("Localhost:3000 server. If you want to terminate press CTRL+C.")
app.listen(3000);
