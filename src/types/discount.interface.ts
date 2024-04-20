export default interface IDiscount {
  id: number;
  discountGroupId: number | null;
  name: string;
  percentage: number;
  isActive: number;
  createdAt?: string;
  modifiedAt?: string;
}
