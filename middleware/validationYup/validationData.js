const statusCode = require('http-status')

const validationData = (schema, dataLocation) =>{

  return async (req, res, next) =>{
    try {
      await schema.validate(req[dataLocation], {abortEarly: false})
      next()
    } catch (error) {
      const errorYup = error.inner.map((err) =>({
        field: err.path,
        message: err.message
      }))
      res.status(statusCode.BAD_REQUEST).json({error: errorYup})
    }
  }

} 

module.exports = validationData

