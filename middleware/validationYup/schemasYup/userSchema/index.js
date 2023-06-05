const yup = require('yup')

const create = yup.object().shape({
  name: yup.string().min(2).trim().strict().required(),
  email: yup.string().email().trim().strict().required(),
  password: yup.string().min(4).trim().strict().required()
})

const update = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().min(2).required(),
  email: yup.string().email().required()
})

const authenticate = yup.object().shape({
  password: yup.string().min(4).required(),
  email: yup.string().email().required()
})

const id = yup.object().shape({
  id: yup.number().integer().required(),
})
const email = yup.object().shape({
  email: yup.string().email().required()
})


module.exports = {
  create,
  update,
  id,
  email,
  authenticate
}