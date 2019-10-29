import express from 'express'
const app = express()
import axios from 'axios'
import path from 'path'
import translate from '@k3rn31p4nic/google-translate-api'

app.use('/', (req,res)=>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/random/:lang', (req,res)=>{
  axios.get('https://api.quotable.io/random').then(resp=>{
    translate(resp.data.content, { to: req.params.lang }).then(respo => {
      res.json({quote:respo.text,by:resp.data.author})
    }).catch(err => {
      res.json({err:err})
    })
  })
})

const port = process.env.PORT || 3000
app.listen(port, ()=>{
  console.log('running')
})
