import mongoose from 'mongoose';
import { IAssignment } from './Assignment';

export interface IProject {
	name: string;
	assignments?: IAssignment[];
}

interface projectModelInterface extends mongoose.Model<any> {
	build(attr: IProject): any;
}

const projectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	assignments: { type: mongoose.Schema.Types.Array, ref: 'Assignment' },
	// itemsCount: {type: Number, default: () => Assignment.find({projectId}).countDocuments()},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	}
});

projectSchema.statics.build = (attr: IProject) => {
	return new Project(attr);
};

const Project = mongoose.model<any, projectModelInterface>(
	'Project',
	projectSchema
);

export { Project };
