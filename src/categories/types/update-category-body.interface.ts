export default interface IUpdateCategoryBody {
  name: string;
  description?: string;
  parentId: number | null;
}
