exports.get = (req,res)=>{

	req.session.user = null

	res.redirect('/login')
	
}