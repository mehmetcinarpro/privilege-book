export default interface ICategory {
  categoryId: number;
  name: string;
  active: boolean;
  order: number;
  parentCategoryId: number | null;
}
