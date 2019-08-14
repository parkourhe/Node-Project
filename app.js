// 路由设计

var express = require('express')

var fs = require('fs')

var path =require('path')

var bodyParser =require('body-parser')

var router =require('./routers/router.js')

var session = require('express-session')

var app = express()

app.engine('html',require('express-art-template'))

app.set(path.join(__dirname,'/views'))

app.use('/node_modules/',express.static('./node_modules/'))

app.use('/public/',express.static('./public/'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',   //配置加密字符串
  resave: false,
  saveUninitialized: true  //ture => 无论你是否使用seesion,都会配置一个seesion
}))

app.use(router)



app.listen('5000',(err)=>{
	if (err) {
		console.log(err);
	}else{
		console.log('runing.....');
	}

})


