export default interface IDiscountBody {
  discountGroupId?: number | null;
  name: string;
  percentage: number;
  isActive?: number | null;
}
