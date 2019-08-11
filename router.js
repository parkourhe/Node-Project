var express = require('express')

var uesr =  require('./models/user.js')

var md5 = require('blueimp-md5')

var router = express.Router()




router.get('/',(req,res)=>{

	res.render('index.html',{
		user : req.session.user
	})

})
	
router.get('/login',(req,res)=>{
	res.render('login.html')
})
 
router.post('/login',(req,res)=>{

	let body = req.body

	uesr.findOne({email:body.email,password:md5(md5(body.password))})
		.then((resolred)=>{
			if (resolred) {

				req.session.user = resolred._doc

				return res.status(200).json({
					err_code:0,
					mess :'ok'
				})	
			}else{
				return res.status(200).json({
					err_code:1,
					mess: 'no'
				})

			}
		})
		


})	



router.get('/register',(req,res)=>{
	res.render('register.html')
})

router.post('/register', (req,res)=>{


	// 获取数据，判断用户是否存在，
	var body  = req.body

	uesr.findOne({
		$or:[{
			email : body.email
		},{

			nickname : body.nickname

		}]
	},(err,data)=>{
		if (err) {
			return res.status(500).json({
				err_code:500,
				mess : '服务端错误'
			})
		}

		if (data) {
			
			 return res.status(200).json({
			 		err_code:1,
			 		mess : "邮箱或名称已存在！"
			 })

		}

		// 进行加密
		body.password = md5(md5(body.password))

		new uesr(body).save((err,data)=>{


			if (err) {
				return res.status(500).json({
					err_code:500,
					mess : '服务端错误'
				})
			}else {

				req.session.user = body

				return res.status(200).json({
					err_code:0,
					mess: 'ok'
				})

			}
		})
		
	})







})


router.get('/logout', (req,res)=>{

	req.session.user = null

	res.redirect('/login')

})




module.exports = router