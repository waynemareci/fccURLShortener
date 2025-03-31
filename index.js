require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next()
})

app.post("/api/shorturl",(req,res) => {
  console.log("body: " + req.body)
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
