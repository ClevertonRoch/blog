const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
var secret = require('./secret')

module.exports = function (req, res, next) {

  const authToken = req.headers['authorization']

  try {
    var token = authToken.split(' ')[1]
    var decoded = jwt.verify(token, secret)
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({success: false, resposnse: 'Usuarios não autenticado'})
    return
  }

  if (!decoded) {
    res.status(httpStatus.BAD_REQUEST).json({success: false, resposnse: 'Usuarios não autenticado'})
    return
  }
  next()

}