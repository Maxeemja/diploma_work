import express, { Request, Response } from 'express';
import { Assignment } from '../models/Assignment';

const router = express.Router();

//Post Method
router.post('/', async (req: Request, res: Response) => {
	const assignment = Assignment.build(req.body);

	try {
		await assignment.save();
		res.status(200).json(assignment);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const data = await Assignment.find().populate(['assignee', 'project']);
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

//Get by ID Method
router.get('/:id', async (req, res) => {
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

//Get by ID Method
router.get('/of/:id', async (req, res) => {
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

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const { currProjId } = req.body;
		await Assignment.findByIdAndDelete(id);
		const items = await Assignment.find(
			currProjId !== 'all' ? { project: currProjId } : {}
		).populate(['assignee', 'project']);
		res.status(200).send(items);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		await Assignment.findByIdAndUpdate(id, updatedData, options);
		const result = await Assignment.find().populate(['assignee', 'project'])

		res.send(result);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

export { router as assignmentsRouter };
