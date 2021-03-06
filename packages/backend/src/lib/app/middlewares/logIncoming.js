const createLog = require('../../../utilities/log')
const uuidv1 = require('uuid/v4')

const log = createLog('logIncomingRequest')

const logIncomingMiddleware = (req, res, next) => {
  res.locals.id = uuidv1()
  log.info(
    `${res.locals.id}: Receive request ${req.method} - ${req.url} from ${
      req.ip
    }`
  )
  next()
}

module.exports = function createLogIncoming() {
  return logIncomingMiddleware
}
