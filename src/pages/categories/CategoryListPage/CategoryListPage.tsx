import React, { useMemo, useState } from "react";
import ICategory from "../../../models/ICategory";
import { categories as data } from "../../../data/categories";
import { Table } from "../../../components/common/Table/Table";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

interface ICategoryListPageProps {}

const CategoryListPage: React.FC<ICategoryListPageProps> = () => {
  const [categories, setCategories] = useState<ICategory[]>(data);

  const columns = useMemo(
    () => [
      {
        Header: "Category ID",
        accessor: "categoryId",
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Active",
        accessor: (category: any) => {
          return category.active ? "YES" : "NO";
        },
      },
      {
        Header: "Order",
        accessor: "order",
      },
      {
        Header: "Parent Category",
        accessor: "parentCategoryId",
      },
      {
        Header: "",
        accessor: "actions",
        Cell: (cell: any) => (
          <>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table columns={columns} data={categories} />
    </>
  );
};

export default CategoryListPage;
