import express, { Request, Response } from 'express';
import { Member } from '../models/Member';

const router = express.Router();

//Post Method
router.post('/', async (req: Request, res: Response) => {
	const { firstName, secondName } = req.body;
	const member = Member.build({
		firstName,
		secondName
	});

	try {
		await member.save();
		res.status(200).json(member);
	} catch (error: any) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/', async (req: Request, res: Response) => {
	try {
		const data = await Member.find();
		res.json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
});

// //Get by ID Method
// router.get('/get/:id', async (req, res) => {
// 	try {
// 		const data = await User.findById(req.params.id);
// 		res.json(data);
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// });

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const updatedData = req.body;
// 		const options = { new: true };

// 		const result = await User.findByIdAndUpdate(id, updatedData, options);

// 		res.send(result);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

// //Delete by ID Method
// router.delete('/delete/:id', async (req, res) => {
// 	try {
// 		const id = req.params.id;
// 		const data = await User.findByIdAndDelete(id);
// 		res.send(`Document with ${data.name} has been deleted..`);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

export { router as membersRouter };
