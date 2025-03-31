require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

//app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//app.use(bodyParser.urlencoded({entended:false}))
//app.use(express.multipart())
app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next()
})

const savedURL = []

app.get('/api/shorturl/:shorturl', (req,res) => {
  console.log("shorturl is " + req.params.shorturl)
  res.redirect(savedURL[req.params.shorturl])
})

app.post('/api/shorturl', (req, res) => {
  function isValidURL (string) {
    const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/
    return pattern.test(string)
  }
  console.log('input url: ' + req.body.url)
  if (isValidURL(req.body.url)) {
    savedURL.push(req.body.url)
    res.json({ original_url: req.body.url, short_url: savedURL.length - 1 })
  } else {
    console.log('found invalid url')
    res.json({ error: 'invalid url' })
  }
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
