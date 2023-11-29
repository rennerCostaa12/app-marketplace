export interface DatasRegisterUser {
  username: string;
  password: string;
  address: string;
  phone: string;
  number_address: number;
  password_confirm?: string | null | undefined;
  complement_address: string | null;
}
