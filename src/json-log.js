const LOG_CONSTANTS = require('./log-constants')

class JsonLog {

  constructor(service, logLevel){
    this.service = service
    this.logLevel = logLevel
  }

  log(message, tags){
    this.info(message, tags)
  }

  info(message, tags){
    this._log(LOG_CONSTANTS.LEVEL.INFO, message, tags)
  }

  debug(message, tags){
    this._log(LOG_CONSTANTS.LEVEL.DEBUG, message, tags)
  }

  error(message, stacktrace, tags){
    this._log(LOG_CONSTANTS.LEVEL.ERROR, message, tags, stacktrace)
  }

  _log(level, message, tags, stacktrace){
    const logObj = {level, message, tags}
    logObj.service = this.service
    logObj.date = new Date()
    if (LOG_CONSTANTS.LEVEL.ERROR === level){
      logObj.stacktrace = stacktrace
      console.error(JSON.stringify(logObj))
    } else{
      console.log(JSON.stringify(logObj))
    }
  }

}

module.exports = JsonLog

//Exemplos
/*
const logSample = new JsonLog('smaple')
logSample.log('teste de msg de log sem tags')
logSample.log('teste de msg de log', {valId:'1235'})
logSample.info('teste de msg de info', {valId:'1235'})
logSample.debug('teste de msg de debug', {valId:'1235'})
logSample.error('teste de msg de error', 'stack trace exception', {valId:'1235'})*/
