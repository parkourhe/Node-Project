var mongoose =require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost/test',{useMongoClient:true})

var Schema  = mongoose.Schema

var userSchema = new Schema({
	email:{

		type: String,

		required :true
	},

	nickname:{

		type:String,

		required :true
	},

	password:{

		type:String||Number,

		required: true

	},

	create_time:{

		type : Date,

		//注意这里不要写Date.now(),因为会即使调用

		//当去new model的时候，如果没有传递create_time,则mongoose则会自动调用default属性
		default: Date.now


	},

	last_modify_time:{

		type : Date,

		default: Date.now

	},

	avatar:{

		type : String,

		default : '/public/img/avatar-default.png'

	},

	bio :{

		type: String,

		default:''

	},

	gande :{

		type : Number,

		enum : [-1,0,1]
	},

	birthday : {

		type :  Date

	},

	status : {

		type : Number,

		// 是否可以评论，
		// 是否登陆使用
		// 0没有权限设置，1不可以评论，1不可以登录
		enum : [0,1,2],
		default : 0


	}




})




module.exports = mongoose.model('User',userSchema)