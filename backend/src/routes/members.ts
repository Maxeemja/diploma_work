import express, { Request, Response } from 'express';
import { Member } from '../models/Member';

const router = express.Router();

router.get('/', async (_, res: Response) => {
	try {
		const users = await Member.find();
		res.json(users);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const user = await Member.findById(req.params.id);
		res.json(user);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const updatedUser = await Member.findByIdAndUpdate(id, updatedData, options);
		res.json(updatedUser);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await Member.findByIdAndDelete(id);
		res.json(`Учасника з імейлом ${user?.email} було видалено`);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

export { router as membersRouter };
