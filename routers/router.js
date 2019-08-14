var express = require('express')

var uesr =  require('../models/user.js')

var md5 = require('blueimp-md5')

var router = express.Router()

var index  = require('./index')

var login = require('./login.js')

var register = require('./register.js')

var logout = require('./logout')

router.get('/',(req,res)=>{

	index.render(req,res)

})


	
router.get('/login',(req,res)=>{

	login.get(req,res)
})
 
router.post('/login',(req,res)=>{

	login.post(req,res,uesr,md5)


})	



router.get('/register',(req,res)=>{
	register.get(req,res)
})

router.post('/register', (req,res)=>{

	register.post(req,res,uesr,md5)

})


router.get('/logout', (req,res)=>{

	logout.get(req,res)

})




module.exports = router