import mongoose, { Schema } from 'mongoose';

enum Roles {
	Admin = 'ADMIN',
	Member = 'MEMBER',
	Moderator = 'MODERATOR'
}

export interface IMember {
	firstName: string;
	secondName: string;
	email?: string;
	password: string;
	role?: Roles;
}

interface MemberDoc extends mongoose.Document {
	firstName: string;
	secondName: string;
	email: string;
	password: string;
	createdAt: Date;
	role?: Roles
}

interface memberModelInterface extends mongoose.Model<MemberDoc> {
	build(attr: IMember): MemberDoc;
}

const memberSchema: Schema = new mongoose.Schema({
	firstName: { type: String, required: true },
	secondName: { type: String, required: true },
	isBusy: { type: Boolean, default: false },
	email: { type: String, lowercase: true, minLength: 7 },
	role: { type: String, default: Roles.Member },
	password: { type: String, minLength: 4 },
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
