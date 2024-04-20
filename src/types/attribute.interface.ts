export default interface IAttribute {
  id: number;
  name: string;
  displayName: string;
  options?: { [index: string]: string | boolean }[];
  createdAt?: string;
  modifiedAt?: string;
}
