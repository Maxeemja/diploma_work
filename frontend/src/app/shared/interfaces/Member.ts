enum Roles {
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

export interface Member {
  _id: string;
  firstName: string;
  secondName: string;
  isBusy?: boolean;
  email: string;
  password: string;
  role: Roles;
}
