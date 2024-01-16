const express = require('express');

const router = express.Router();

const User = require('../models/User');

//Post Method
router.post('/post', async (req, res) => {
	const user = new User({
		name: req.body.name,
		age: req.body.age,
		hobbies: req.body?.hobbies || [],
		email: req.body?.email || null,
		bestFriend: req.body?.bestFriend || null
	});

	try {
		await user.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.get('/get', async (req, res) => {
	try {
		const data = await User.find();
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get by ID Method
router.get('/get/:id', async (req, res) => {
	try {
		const data = await User.findById(req.params.id);
		res.json(data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const updatedData = req.body;
		const options = { new: true };

		const result = await User.findByIdAndUpdate(id, updatedData, options);

		res.send(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = await User.findByIdAndDelete(id);
		res.send(`Document with ${data.name} has been deleted..`);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
