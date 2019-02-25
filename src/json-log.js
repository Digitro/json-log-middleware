const LOG_CONSTANTS = require('./log-constants')
let currentLogLevel =  LOG_CONSTANTS.LEVEL.INFO

const logContext = require('./log-context')

class JsonLog {

  constructor(service){
    this.service = service
  }

  log(message, tags){
    this.info(message, tags)
  }

  info(message, tags){
    if(LOG_CONSTANTS.LEVEL.ERROR !== currentLogLevel)
      this._log(LOG_CONSTANTS.LEVEL.INFO, message, tags)
  }

  debug(message, tags){
    if(LOG_CONSTANTS.LEVEL.DEBUG === currentLogLevel)
      this._log(LOG_CONSTANTS.LEVEL.DEBUG, message, tags)
  }

  error(message, error, tags){
    if (message instanceof Error) {
      tags = error
      error = message
      message = error.message
    }
    if(error){
      const errorInfo = {code: error.code || error.statusCode, message: error.message}
      //stack só é logado se estiver em modo debug
      if(LOG_CONSTANTS.LEVEL.DEBUG === currentLogLevel){
        errorInfo.stack = message.stack
      }
      this._log(LOG_CONSTANTS.LEVEL.ERROR, message, tags, errorInfo)
    } else{
      this._log(LOG_CONSTANTS.LEVEL.ERROR, message, tags)
    }
  }

  _log(level, message, tags, errorInfo){
    const logObj = {level, message, tags}
    logObj.service = this.service
    logObj.date = new Date()

    //acrescentando identificador da requisição
    if(logContext.getCurrentContext()){
      logObj.valId = logContext.getCurrentContext()
    }

    if (LOG_CONSTANTS.LEVEL.ERROR === level){
      logObj.errorInfo = errorInfo
      console.error(JSON.stringify(logObj))
    } else{
      console.log(JSON.stringify(logObj))
    }
  }

  static setLogLevel(logLevel){
    currentLogLevel = logLevel
  }

  static getLogLevel(){
    return currentLogLevel
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
