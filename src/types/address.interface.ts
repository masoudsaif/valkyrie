export default interface IAddress {
  id: number;
  street: string;
  unit: string | null;
  city: string;
  state: string;
  stateId: number;
  zip: string;
  isBilling: number;
  isPrimary: number;
  isDeletable: number;
  createdAt?: string;
  modifiedAt?: string;
}
