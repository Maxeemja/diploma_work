import mongoose from 'mongoose';

export interface IProject {
	name: string;
}

interface projectModelInterface extends mongoose.Model<any> {
	build(attr: IProject): any;
}

const projectSchema = new mongoose.Schema({
	name: { type: String, required: true },
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
