export enum Roles {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  MODERATOR = 'MODERATOR'
}

export enum RolesUI {
  ADMIN = 'Адмін',
  MEMBER = 'Учасник',
  MODERATOR = 'Модератор'
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
