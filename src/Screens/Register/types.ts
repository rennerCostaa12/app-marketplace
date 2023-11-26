export interface DatasRegisterUser {
  username: string;
  email: string;
  password: string;
  profile_img: string | null;
  address: string;
  password_confirm?: string | null | undefined;
  complement_address: string | null;
}
