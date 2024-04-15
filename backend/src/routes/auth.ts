import express from 'express';
import { Member } from '../models/Member';

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
	const { firstName, secondName, email, password, role = 'MEMBER' } = req.body;

	//перевіряємо чи немає зареєстрованого юзера за таким імейлом
	const verifyEmail = await Member.findOne({ email: email });
	try {
		if (verifyEmail) {
			return res.status(403).json({
				message: 'Емейл вже використано'
			});
		} else {
			//використовуємо bcrypt для хешування пароля
			bcrypt.hash(password, 10).then((hash) => {
				//створюємо запис нового юзера
				const user = new Member({
					firstName,
					secondName,
					email,
					password: hash,
					role
				});

				//зберігаємо нового юзера
				user
					.save()
					.then((response) => {
						return res.status(201).json({
							message: 'користувача було успішно створено!',
							result: response,
							success: true
						});
					})
					.catch((error) => {
						res.status(500).json({
							error: error
						});
					});
			});
		}
	} catch (error) {
		return res.status(412).send({
			success: false,
			message: error.message
		});
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await Member.findOne({
			email: email
		});

		const response = await bcrypt.compare(password, user?.password);

		if (!user || !response) {
			return res.status(401).json({
				message: 'Аутентифікація не була успішна'
			});
		}
		let jwtToken = jwt.sign(
			{
				email: user.email
			},
			process.env.JWT_SECRET,
			{
				expiresIn: '1d'
			}
		);
		return res.status(200).json({
			token: jwtToken,
			userId: user._id
		});
	} catch (err) {
		return res.status(401).json({
			message: 'Неправильний логін та/або пароль',
			success: false
		});
	}
};

router.post('/register', register);

router.post('/login', login);

export { router as authRouter };
