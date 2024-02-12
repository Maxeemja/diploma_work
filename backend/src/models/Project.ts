import mongoose from 'mongoose';

export interface IProject {
	name: string;
}

interface projectModelInterface extends mongoose.Model<any> {
	build(attr: IProject): any;
}

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: function (v: string) {
				return /^((?!all).)*$[a-zA-Z]/i.test(v);
			},
			message: (props: any) => `Project cannot be named like this!`
		}
	},
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
