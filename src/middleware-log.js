const express = require('express')
const bodyParser = require('body-parser')
const JsonLog = require('./json-log')
const uuidv1 = require('uuid/v1')
const LOG_CONSTANTS = require('./log-constants')
const logContext = require('./log-context')

const logRequest = (app, service, generateValId) => {
  const logger = new JsonLog(service)

  app.use(bodyParser.text())

  app.use('/log', express.static(__dirname + '/client', {
       index: 'index.html'
  }))

  app.get('/log/service', (req, res) => {
    res.json(service)
  })

  app.get('/log/level', (req, res) => {
    res.json(JsonLog.getLogLevel())
  })

  app.post('/log/level', (req, res) => {
    const logLevel = req.body
    JsonLog.setLogLevel(logLevel)
    res.sendStatus(200)
  })

  return function(req, res, next) {
    //identificador da requisição
    let valId = req.header(LOG_CONSTANTS.TRACE_HEADER) || req.query.valId
    if(!valId && generateValId){
      valId = uuidv1()
      req.headers[LOG_CONSTANTS.TRACE_HEADER] = valId
    }
    if(valId){
      logContext.startNewContext(valId)
      res.set(LOG_CONSTANTS.TRACE_HEADER, valId)
    }
    //logando as informações
    const srcIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const tags = {srcIp:srcIp, url: req.url, params: req.params, query: req.query, method:req.method, headers:req.headers}
    logger.debug('[REST request log interceptor]', tags)
    next()
  }
}

module.exports = logRequest