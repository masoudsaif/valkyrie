export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  isAdmin: number;
  isEmailVerified: number;
  isPhoneVerified: number;
  emailToken: string | null;
  phoneToken: string | null;
  companyId: number | null;
}
