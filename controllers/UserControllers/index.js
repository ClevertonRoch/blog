// const userModel = require('../../models/User')
const statusCode = require('http-status')
const UserModel = require('./../../models/UserModels')

const findAll = async (req, res)=>{
  res.status(statusCode.NOT_FOUND).json({success: true, response: 'OK'})
}


const findOne = async ()=>{

}

const create = async ( req, res )=>{
  let name = req.body.name
  let email = req.body.email
  let password = req.body.password
  UserModel.create({
    name: name,
    email: email,
    password: password
  }).then(()=>{

    res.status(statusCode.OK).json({success: true, response: 'Registro inserido'})
  }).catch((error)=>{
    res.status(statusCode.BAD_GATEWAY).json({success: false, response: error})
  })
}


module.exports = {
  findAll,
  findOne,
  create
}