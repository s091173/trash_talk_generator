// app.js
// include packages and define server related variables
const express = require('express')
const exphbs = require('express-handlebars')
const handlebars = require('handlebars')
const bodyParser = require('body-parser')
const generateTrashTalk = require('./generate_trash_talk')
const app = express()
const port = 3000

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// register helper
handlebars.registerHelper('ifEqual', function (job, targetJob, options) {
  if (job === targetJob) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const job = req.body.option
  const trashTalk = generateTrashTalk(job)
  res.render('index', { trashTalk: trashTalk, job: job })
})

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`)
})