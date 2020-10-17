import ICategory from "../models/ICategory";

export const categories: ICategory[] = [
  {
    categoryId: 1,
    name: "Evénement oriental",
    active: true,
    order: 1,
    parentCategoryId: null,
  },
  {
    categoryId: 2,
    name: "Evénement occidental",
    active: true,
    order: 2,
    parentCategoryId: null,
  },
  {
    categoryId: 3,
    name: "Evénement africain",
    active: true,
    order: 3,
    parentCategoryId: null,
  },
];
