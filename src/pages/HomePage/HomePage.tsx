import Grid from '@material-ui/core/Grid';
import React, { useEffect, useMemo, useState } from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { Table } from '../../components/common';
import Header from '../../components/Header/Header';
import Layout from '../../components/Layout/Layout';
 
export interface HomePageProps { 
} 
 
const HomePage: React.FC<HomePageProps> = () => {    
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const doFetch = async () => {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const body = await response.json();
      const contacts = body.results;
      console.log(contacts);
      setData(contacts);
    }
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
      }
    ],
    []
  );

  
  console.log("TABLE RENDER");

  return (
    <>
        <Header />
        <Layout>
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
        </Layout>
    </>
  )
}
 
export default HomePage;