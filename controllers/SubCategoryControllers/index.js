const httpStatus = require('http-status')
const subCategoryModel = require('./../../models/SubCategories')
const categoryModel = require('./../../models/Categories')
const slugify = require('slugify')



const create = async (req, res) => {

  var data = {
    subCategory: req.body.subCategory,
    slug: slugify(req.body.subCategory),
    categoryId: req.body.categoryId
  }
  try {
    var checkSub = await subCategoryModel.findOne({ where: { subCategory: data.subCategory } })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (checkSub) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa Sub-categoria já está registrada' })
    return
  }
  try {
    var checkCar = await categoryModel.findOne({ where: { id: data.categoryId } })
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!checkCar) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa categoria é invalida' })
    return
  }
  try {
    await subCategoryModel.create(data)
    res.status(httpStatus.OK).json({ success: true, response: 'Registro realizado' })
    return
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
}

const findAll = async (req, res) => {
  try {
    const subCategory = await subCategoryModel.findAll({
      attributes: [
        ['id', 'id_subCategory'],
        'subCategory',
      ],
      include: [
        {
          model: categoryModel,
          attributes: [
            ['id', 'id_category'],
            'category'
          ]
        }
      ]
    })
    if (!subCategory.length > 0) {
      res.status(httpStatus.OK).json({ success: true, response: 'Nenhum registro encontrado' })
      return
    }
    res.status(httpStatus.OK).json({ success: true, response: subCategory })
    return

  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
}

const findId = async (req, res) => {
  let id = req.params.id
  try {
    const serch = await subCategoryModel.findByPk(id, {
      attributes: [
        ['id', 'id_subcat'],
        'subCategory',
        ['slug', 'slug_sub']
      ],
      include: [
        {
          model: categoryModel,
          attributes: [
            ['id', 'id_cat'],
            ['slug', 'slug_cat'],
            'category'
          ]
        }
      ]
    })
    if (!serch) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
      return
    }
    res.status(httpStatus.OK).json({ success: true, response: serch })
    return
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }

}

const update = async (req, res) => {
  let data = {
    id: req.body.id,
    subCategory: req.body.subCategory,
    slug: slugify(req.body.subCategory),
    categoryId: req.body.categoryId
  }
  try {
    var check = await subCategoryModel.findByPk(data.id)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!check) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  if (check.subCategory !== data.subCategory) {
    var checkUnique = await subCategoryModel.findOne({ where: { subCategory: data.subCategory } })
  }
  if (checkUnique) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa sub-categoria já está cadastrada' })
    return
  }
  try {
    await subCategoryModel.update(data, { where: { id: data.id } })
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
    var check = await subCategoryModel.findByPk(id)
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (!check) {
    res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return
  }
  try {
    await subCategoryModel.destroy({where: {id: id}})
    res.status(httpStatus.OK).json({ success: true, response: 'Registro deletado' })
    return
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
}


module.exports = {
  create,
  findAll,
  findId,
  update,
  destroy
}