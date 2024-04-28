import express, { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	const assignment = Assignment.build(req.body);

	try {
		await assignment.save();
		res.status(200).json();
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const isQuerySent = Boolean(Object.keys(query).length);

		const data = await Assignment.find(isQuerySent ? query : null).populate([
			'assignee',
			'project'
		]);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/:id', async (req: Request, res: Response) => {
	try {
		const data = await Assignment.findById(req.params.id).populate([
			'assignee',
			'project'
		]);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/of/:id', async (req: Request, res: Response) => {
	try {
		const data = await Assignment.find({ project: req.params.id }).populate([
			'assignee',
			'project'
		]);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		await Assignment.findByIdAndDelete(id);
		res.status(200).json();
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.patch('/update/:id', async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		await Assignment.findByIdAndUpdate(id, updatedData, options);
		res.status(200).json();
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

export { router as assignmentsRouter };
