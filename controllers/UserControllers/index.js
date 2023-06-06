const statusCode = require('http-status')
const UserModel = require('./../../models/UserModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

var secret = require('./../../middleware/auth/secret')

const findAll = async (req, res) => {

  UserModel.findAll({
    attributes: ['id', 'name', 'email'],
  }).then((users) => {
    if (users.length > 0) {
      res.status(statusCode.OK).json({ success: true, response: users })
      return
    }
    res.status(statusCode.NOT_FOUND).json({ success: false, response: 'Nenhum registro encontrado' })
    return

  }).catch((error) => {
    res.status(statusCode.NOT_FOUND).json({ success: false, response: error })
  })
}


const findOne = async (req, res) => {
  let id = req.params.id
  UserModel.findOne({
    where: { id: id },
    attributes: ['id', 'name', 'email']
  }).then((user) => {
    if (user) {
      res.status(statusCode.OK).json({ success: true, response: user })
      return
    }
    res.status(statusCode.OK).json({ success: false, response: 'Nenhum registro encontrado' })
    return

  }).catch((error) => {
    res.status(statusCode.BAD_GATEWAY).json({ success: false, response: error })
    return
  })

}



const create = async (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password


  try {
    var emailCheck = await UserModel.findOne({ where: { email: email } })
  } catch (error) {
    res.status(statusCode.BAD_GATEWAY).json({ success: false, response: error })
    return
  }
  if (emailCheck) {
    res.status(statusCode.BAD_GATEWAY).json({ success: false, response: 'Email já está cadastrado' })
    return
  }

  password = bcrypt.hashSync(password,10)

  UserModel.create({
    name: name,
    email: email,
    password: password
  }).then(() => {
    res.status(statusCode.OK).json({ success: true, response: 'Registro inserido' })
  }).catch((error) => {
    res.status(statusCode.BAD_GATEWAY).json({ success: false, response: error.errors[0].message })
  })
}








const destroy = async (req, res) => {
  let id = req.params.id
  try {
    var userExiste = await UserModel.findByPk(id)
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ success: false, response: error })
  }
  if (!userExiste) {
    res.status(statusCode.NOT_FOUND).json({ success: false, response: 'Registro não encontrado' })
    return
  }
  try {
    await UserModel.destroy({ where: { id: id } })
    res.status(statusCode.OK).json({ success: true, response: 'Registro deletado' })
    return
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ success: false, response: error })
    return
  }

}

const update = async (req, res) => {
  let id = req.body.id
  let email = req.body.email
  try {
    var user = await UserModel.findByPk(id, {
      attributes: ['id', 'name', 'email']
    })
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ success: false, response: error })
    return
  }
  if (!user) {
    res.status(statusCode.NOT_FOUND).json({ success: false, response: 'Registro não encontrado' })
    return
  }
  if (email !== user.email) {
    try {
      var emailCheck = await UserModel.findOne({ where: { email: email } })
    } catch (error) {
      res.status(statusCode.BAD_REQUEST).json({ success: false, response: error })
      return
    }
  }
  
  if (emailCheck) {
    res.status(statusCode.NOT_FOUND).json({ success: false, response: 'Email duplicado' })
    return
  }
  try {
    await UserModel.update(req.body,{
      where: {id: req.body.id}
    })
    res.status(statusCode.OK).json({success: true, response: 'Registro realizado'})
  } catch (error) {
    res.status(statusCode.BAD_REQUEST).json({ success: false, response: error })
    return
  }
}

const authenticate = async (req, res) =>{
  let email = req.body.email
  let password = req.body.password
  try {
    var user = await UserModel.findOne({where:{email: email}})
  } catch (error) {
    res.status(statusCode.BAD_GATEWAY).json({success: false, response: error})
    return
  }

  if (!user) {
    res.status(statusCode.BAD_GATEWAY).json({success: false, response: 'Email invalido'})
    return
  }
  
  if (!await bcrypt.compare(password, user.password)) {
    res.status(statusCode.NOT_FOUND).json({success: false, response: 'Senha Invalida'})
    return 
  }
  var token = jwt.sign({ name: user.name, email: user.email }, secret,'8h')
  res.status(statusCode.OK).json({success: true, response: 'Acesso liberado', token: token})
  return

  
}


module.exports = {
  findAll,
  findOne,
  create,
  destroy,
  update,
  authenticate
}