const httpStatus = require('http-status')
const productModel = require('./../../models/ProductModels')
const userModel = require('./../../models/UserModels')
const subCategoryModel = require('./../../models/SubCategories')
const categoryModel = require('./../../models/Categories')
const slugify = require('slugify')
const Sequelize = require('sequelize')



const create = async (req, res) => {

  var data = {
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
    price: req.body.price,
    userId: req.body.userId,
    subcategoryId: req.body.subcategoryId,
    categoryId: req.body.categoryId
  }

  try {
    var checkCar = await categoryModel.findOne({ where: { id: data.categoryId } })
    if (!checkCar) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa categoria é invalida' })
      return
    }

    var checkSub = await subCategoryModel.findOne({
      where: {
        id: data.subcategoryId,
        categoryId: {
          [Sequelize.Op.eq]: data.categoryId
        }
      }
    })
    if (!checkSub) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'A categoria selecionada não possui uma sub-categoria com esse nome' })
      return
    }

    var checkProd = await productModel.findOne({
      where: {
        name: data.name,
        subcategoryId: {
          [Sequelize.Op.eq]: data.subcategoryId
        }
      }
    })
    if (checkProd) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa Sub-categoria já possui um produto com esse nome registrada' })
      return
    }

    var checkUser = await userModel.findOne({
      where: {
        id: data.userId
      }
    })
    if (!checkUser) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'O id de usuario para registro não é válido' })
      return
    }

  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  try {
    await productModel.create(data)
    res.status(httpStatus.OK).json({ success: true, response: 'Registro realizado' })
    return
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }

}

const findAll = async (req, res) => {
  try {
    var product = await productModel.findAll({
      attributes: ['id', 'name', 'description', 'price'],
      include: [
        {
          model: categoryModel,
          attributes: [
            'id', 'category'
          ]
        },
        {
          model: subCategoryModel,
          attributes: ['id', 'subcategory']
        },
        {
          model: userModel,
          attributes: ['id', 'name']
        }
      ]
    })
    if (!product.length > 0) {
      res.status(httpStatus.OK).json({ success: true, response: 'Nenhum produto encontrado' })
      return
    }
    res.status(httpStatus.OK).json({ success: true, response: product })
    return

  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
}

const findByPk = async (req, res) => {
  let id = req.params.id
  try {
    const serch = await productModel.findByPk(id, {
      attributes: [
        'id', 'name', 'description', 'price'
      ],
      include: [
        {
          model: categoryModel,
          attributes: ['id', 'category']
        },
        {
          model: subCategoryModel,
          attributes: ['id', 'subcategory']
        },
        {
          model: userModel,
          attributes: ['id', 'name']
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
    name: req.body.name,
    slug: slugify(req.body.name),
    description: req.body.description,
    price: req.body.price,
    userId: req.body.userId,
    subcategoryId: req.body.subcategoryId,
    categoryId: req.body.categoryId
  }

  try {
    var product = await productModel.findByPk(data.id)
    if (!product) {
      res.status(httpStatus.NOT_FOUND).json({ success: false, response: 'O produto não foi encontrado' })
      return
    }
    let checkCar = await categoryModel.findOne({ where: { id: data.categoryId } })
    if (!checkCar) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa categoria é invalida' })
      return
    }
    let checkSub = await subCategoryModel.findOne({
      where: {
        id: data.subcategoryId,
        categoryId: {
          [Sequelize.Op.eq]: data.categoryId
        }
      }
    })
    if (!checkSub) {
      res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'A categoria selecionada não possui uma sub-categoria com esse nome' })
      return
    }
    
  } catch (error) {
    res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
    return
  }

  if (product.name !== data.name) {
    try {
      var checkUnique = await productModel.findOne({
        where:
        {
          name: data.name,
          subcategoryId: {
            [Sequelize.Op.eq]: data.subcategoryId
          }
        }
      })
      if (checkUnique) {
        res.status(httpStatus.BAD_REQUEST).json({ success: false, response: 'Essa sub-categoria já possui um produto com esse nome registrado' })
        return
      }
    } catch (error) {
      res.status(httpStatus.BAD_GATEWAY).json({ success: false, response: error })
      return
    }

  }

  try {
    await productModel.update(data, { where: { id: data.id } })
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
    await subCategoryModel.destroy({ where: { id: id } })
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
  findByPk,
  update,
  destroy
}