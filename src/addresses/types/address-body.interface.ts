export default interface IAddressBody {
  street: string;
  unit: string;
  city: string;
  state: string;
  stateId: number;
  zip: string;
  isPrimary: number;
  isBilling?: number;
  isDeletable?: number;
}
