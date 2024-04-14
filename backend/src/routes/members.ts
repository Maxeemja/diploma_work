import express, { Request, Response } from 'express';
import { Member } from '../models/Member';

const router = express.Router();

router.get('/', async (_, res: Response) => {
	try {
		const data = await Member.find();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const data = await Member.findById(req.params.id);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await Member.findByIdAndUpdate(id, updatedData, options);
		res.send(result);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Member.findByIdAndDelete(id);
		res.send(`Учасника з імейлом ${data?.email} було видалено`);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

export { router as membersRouter };
