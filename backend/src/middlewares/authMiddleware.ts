const jwt = require('jsonwebtoken');

export default (req: any, res: any, next: any) => {
	try {
		const token = req.headers.authorization.replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userData = decoded;
		next();
	} catch (err) {
		return res.status(401).json({
			message: 'Authentification Failed'
		});
	}
};
