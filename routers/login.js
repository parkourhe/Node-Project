exports.get=(req,res)=>{

	res.render('login.html')


}

exports.post=(req,res,uesr,md5)=>{

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



}