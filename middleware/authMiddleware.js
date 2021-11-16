const authLocalMiddleware = () => {
	return function(req, res, next){
		if(req.isAuthenticated()){
			return next();
		}
		return res.json({ type: 'error', message: "You're not authenticated" });
	}
}
