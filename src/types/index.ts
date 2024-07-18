export type Role = {
  id: string;
  name: string;
};

export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  registeredAt: number;
  roleId: string;
}

export interface AuthUser extends User {
  role: string;
}
