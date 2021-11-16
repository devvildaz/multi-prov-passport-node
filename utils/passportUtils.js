
const findUser = function(username, done){
	// TODO: Find User
	console.log('findUser');
}

const serializeUser = function(){
	const liteUser = {
		email: 'xdpvd@hotmail.es',
		fullname: 'Diego Percy Vilca Daza'
	}
	return liteUser; 
}

module.exports = {
	findUser,
	serializeUser
}
