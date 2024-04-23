import express, { Request, Response } from 'express';
import { Project } from '../models/Project';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	const project = Project.build({
		name: req.body.name
	});

	try {
		await project.save();
		res.status(200).json(project);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const data = await Project.find();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const data = await Project.findById(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await Project.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await Project.findByIdAndDelete(id);
		res.send(`Document with ${data.name} has been deleted..`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

export { router as projectsRouter };
