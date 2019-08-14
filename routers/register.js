exports.get = (req,res)=>{

	res.render('register.html')


}


exports.post = (req,res,uesr,md5)=>{


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




}