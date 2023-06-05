const yup = require('yup')

const create = yup.object().shape({
  category: yup.string().trim().strict().min(2).required()
})
const update = yup.object().shape({
  id: yup.number().integer().required(),
  category: yup.string().trim().strict().min(2).required()
})
const id = yup.object().shape({
  id: yup.number().integer().required()
})

module.exports = {
  create,
  update,
  id 
}