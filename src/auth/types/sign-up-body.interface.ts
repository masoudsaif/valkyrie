export default interface ISignUpBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: {
    name: string;
    typeId: number;
    sizeId: number;
  };
}
