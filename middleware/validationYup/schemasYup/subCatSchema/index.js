const yup = require('yup')

const create = yup.object().shape({
  categoryId: yup.number().min(1).integer().required(),
  subCategory: yup.string().trim().min(2).strict().required()
})

const update = yup.object().shape({
  id: yup.number().integer().required(),
  subCategory: yup.string().trim().min(2).strict().required(),
  categoryId: yup.number().integer().required()
})

const id = yup.object().shape({
  id: yup.number().integer().required(),
})

module.exports = {
  create,
  update,
  id
}