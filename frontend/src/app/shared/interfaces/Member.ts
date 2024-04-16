enum Roles {
  Admin = 'ADMIN',
  Member = 'MEMBER',
  Moderator = 'MODERATOR'
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
