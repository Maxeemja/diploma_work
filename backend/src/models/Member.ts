import mongoose, { Schema } from 'mongoose';

export interface IMember {
	firstName: string;
	secondName: string;
	email?: string;
}

interface MemberDoc extends mongoose.Document {
	firstName: string;
	secondName: string;
	email?: string;
	createdAt: Date;
}

interface memberModelInterface extends mongoose.Model<MemberDoc> {
	build(attr: IMember): MemberDoc;
}

const memberSchema: Schema = new mongoose.Schema({
	firstName: { type: String, required: true },
	secondName: { type: String, required: true },
	isBusy: { type: Boolean, default: false },
	email: { type: String, lowercase: true, minLength: 7 },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	}
});

memberSchema.statics.build = (attr: IMember) => {
	return new Member(attr);
};

const Member: memberModelInterface = mongoose.model<
	MemberDoc,
	memberModelInterface
>('Member', memberSchema);

export { Member };
