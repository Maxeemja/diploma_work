import mongoose from 'mongoose';
import { IMember } from './Member';
import { IProject } from './Project';

enum Status {
	ToDo,
	InProgress,
	Done,
	Blocked
}

enum Priority {
	Low,
	Medium,
	High
}

export interface IAssignment {
	name: string;
	description: string;
	status?: Status;
	priority?: Priority;
	deadline: Date;
	project: IProject;
  assignee?: IMember
}

interface assignmentModelInterface extends mongoose.Model<any> {
	build(attr: IAssignment): any;
}

const assignmentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: Number, default: Status.ToDo },
	priority: { type: Number, default: Priority.Medium },
	deadline: { type: Date, required: true },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
	project: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' }
});

assignmentSchema.statics.build = (attr: IAssignment) => {
	return new Assignment(attr);
};

const Assignment = mongoose.model<any, assignmentModelInterface>(
	'Assignment',
	assignmentSchema
);

export { Assignment };
