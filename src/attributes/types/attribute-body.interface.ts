export default interface IAttributeBody {
  name: string;
  displayName: string;
  options?: { [index: string]: string | boolean }[];
}
