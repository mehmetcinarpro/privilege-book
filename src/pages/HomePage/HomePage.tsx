import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Grid from "@material-ui/core/Grid";

import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { Table } from "../../components/common/Table";

interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}
export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [data, setData] = useState<any[]>([]);
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => console.log(data);

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    };
    doFetch();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "name.title",
        disableSortBy: true,
        disableGlobalFilter: true,
      },
      {
        Header: "First Name",
        accessor: "name.first",
      },
      {
        Header: "Last Name",
        accessor: "name.last",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
        accessor: "location.city",
      },
      {
        Header: "",
        accessor: "actions",
      },
    ],
    []
  );

  console.log("TABLE RENDER");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="firstName" ref={register({ required: true, maxLength: 20 })} />
        <input name="lastName" ref={register({ pattern: /^[A-Za-z]+$/i })} />
        <input name="age" type="number" ref={register({ min: 18, max: 99 })} />
        <input type="submit" />
      </form>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <CategoryCard />
        </Grid>
        <Grid item md={4}>
          <CategoryCard />
        </Grid>
        <Grid item md={4}>
          <CategoryCard />
        </Grid>
      </Grid>
      <Table columns={columns} data={data} canSort canSearch />
    </>
  );
};

export default HomePage;
