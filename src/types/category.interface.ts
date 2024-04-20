export default interface ICategory {
  id: number;
  name: string;
  description: string | null;
  parentId: number | null;
  imageUrl: string;
  createdAt?: string;
  modifiedAt?: string;
}
