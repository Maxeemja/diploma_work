import mongoose from 'mongoose';

export interface IEmail {
	email: string;
}

interface allowedEmailModelInterface extends mongoose.Model<any> {
	build(attr: IEmail): any;
}

const allowedEmailSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		dropDups: true
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	}
});

allowedEmailSchema.statics.build = (attr: IEmail) => {
	return new AllowedEmail(attr);
};

const AllowedEmail = mongoose.model<any, allowedEmailModelInterface>(
	'AllowedEmail',
	allowedEmailSchema
);

export { AllowedEmail };
