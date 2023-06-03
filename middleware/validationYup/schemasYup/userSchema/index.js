const yup = require('yup')

const createUserSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).required()
})

const updateUserSchema = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().min(2).required(),
  email: yup.string().email().required()
})

const authUserSchema = yup.object().shape({
  password: yup.string().min(4).required(),
  email: yup.string().email().required()
})

const idUserSchema = yup.object().shape({
  id: yup.number().integer().required(),
})
const emailUserSchema = yup.object().shape({
  email: yup.string().email().required()
})


module.exports = {
  createUserSchema,
  updateUserSchema,
  idUserSchema,
  emailUserSchema,
  authUserSchema
}