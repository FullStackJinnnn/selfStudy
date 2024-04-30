const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

//application/x-www-form-urlencoded 를 분석해서 가져옴
app.use(bodyParser.urlencoded({ extended: true }));
//application/json 제이슨 타입을 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ddoljin:1234@cluster0.6vtyedu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB Connected!')).catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~!!!!!!!!!!!!!!!!')
})



  //회원 가입 할때 필요한 정보들을 cliend에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  app.post('/register', async (req, res) => {
    //회원가입시 필요 정보를 client에서 가져오면
    //데이터베이스에 삽입한다
  
    //body parser를 통해 body에 담긴 정보를 가져온다
    const user = new User(req.body)
  
    //mongoDB 메서드, user모델에 저장
    const result = await user.save().then(()=>{
      res.status(200).json({
        success: true
      })
    }).catch((err)=>{
      res.json({ success: false, err })
    })
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})