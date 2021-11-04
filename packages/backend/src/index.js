const express = require('./services/express')
const routes = require('./routes')
const {appConfig} = require('./config')
const app = express(routes)

app.listen(appConfig.APP_PORT, () => {
  console.log(
    'Express server listening on %d, in %s mode',
    appConfig.APP_PORT,
    appConfig.ENV,
  )
})

module.exports = app
