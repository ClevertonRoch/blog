const express = require('express')
const app = express()

app.get('/',(req, res) =>{
  res.send('rota ok')
})

app.listen(8080, ()=>{console.log('Server ok')})