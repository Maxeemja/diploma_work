import express, { Request, Response } from 'express';
import { AllowedEmail } from '../models/AllowedEmail';
import { Member } from '../models/Member';

const router = express.Router();

router.get('/', async (_, res: Response) => {
	try {
		const emails = await AllowedEmail.find();
		res.json(emails);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

// початкове налаштування
router.post('/init', async (_, res: Response) => {
	try {
		const users = await Member.find();
		const emailsArr = [];
		for (let user of users) {
			emailsArr.push({ email: user.email });
		}
		const response = await AllowedEmail.insertMany(emailsArr);
		res.json(response);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.post('/', async (req: Request, res: Response) => {
	try {
		const newEmail = AllowedEmail.build(req.body);
		await newEmail.save();
		const response = await AllowedEmail.find();

		res.status(200).json(response);
	} catch (error: any) {
		res.status(500).json({ message: 'Такий емейл уже є у базі!' });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const user = await AllowedEmail.findById(req.params.id);
		res.json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.patch('/:id', async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const updatedUser = await AllowedEmail.findByIdAndUpdate(
			id,
			updatedData,
			options
		);
		res.json(updatedUser);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const email = await AllowedEmail.findByIdAndDelete(req.params.id);
		await Member.findOneAndDelete({ email: email.email });
		res.status(200).json(`Імейл було видалено`);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

export { router as emailsRouter };
