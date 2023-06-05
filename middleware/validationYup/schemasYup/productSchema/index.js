const yup = require('yup')

const create = yup.object().shape({
  name: yup.string().trim().min(2).strict().required(),
  description: yup.string().trim().strict(),
  price: yup.number().min(1),
  userId: yup.number().min(1).integer().required(),
  categoryId: yup.number().min(1).integer().required(),
  subCategoryId: yup.number().min(1).integer().required()
})

const update = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().trim().min(2).strict().required(),
  description: yup.string().trim().strict(),
  price: yup.number().min(1),
  userId: yup.number().min(1).integer().required(),
  categoryId: yup.number().min(1).integer().required(),
  subCategoryId: yup.number().min(1).integer().required()
})

const id = yup.object().shape({
  id: yup.number().integer().required(),
})

module.exports = {
  create,
  update,
  id
}