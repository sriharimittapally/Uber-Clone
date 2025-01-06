const http = require("http");
const app = require("./app");
const {initializeSocket} = require('./socket');
const port = process.env.PORT || 3000

const server = http.createServer(app);

initializeSocket(server);

app.get('/' ,(req, res)=>{
  res.send("I am Backend");
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
