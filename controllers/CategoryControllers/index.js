const httpStatus = require('http-status')
const categoryModel = require('../../models/Categories')
const slugify = require('slugify')


const create = async (req, res) => {
  var category = req.body.category
  var slug = slugify(category)
  try {
    var result = await categoryModel.findOne({ where: { category: category } })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (result) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa categoria já está registrada' })
    return
  }
  try {
    await categoryModel.create({ category, slug })
    res.status(httpStatus.OK).json({ success: true, response: 'Registro realizado' })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
}

const findAll = async (req, res) => {
  try {
    var categ = await categoryModel.findAll()
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!categ.length > 0) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  res.status(httpStatus.OK).json({ success: true, response: categ })
  return

}

const findByPk = async (req, res) => {
  let id = req.params.id
  try {
    var checkId = await categoryModel.findByPk(id, {
      attributes: ['id', 'category', 'slug']
    })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!checkId) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  res.status(httpStatus.OK).json({ success: true, response: checkId })
  return
}

const update = async (req, res) => {
  var data = {
    id: req.body.id,
    category: req.body.category,
    slug: slugify(req.body.category)
  }
  try {
    var checkId = await categoryModel.findByPk(data.id, {
      attributes: ['id', 'category']
    })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!checkId) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  if (data.category === checkId.category) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Para realizar alteração, envie dados diferente do atual' })
    return
  }
  try {
    await categoryModel.update(data, { where: { id: data.id } })
    res.status(httpStatus.OK).json({ success: true, response: 'Registro realizado' })
    return
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }

}

const destroy = async (req, res) => {
  let id = req.params.id
  try {
    var checkId = await categoryModel.findByPk(id)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!checkId) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  try {
    await categoryModel.destroy({where:{id: id}})
    res.status(httpStatus.OK).json({success: true, response: 'Registro deletado'})
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  
}

module.exports = {
  create,
  findAll,
  findByPk,
  update,
  destroy
}