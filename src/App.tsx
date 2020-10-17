import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import CategoryListPage from "./pages/categories/CategoryListPage/CategoryListPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Switch>
            <Route path="/categories">
              <CategoryListPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </>
  );
}

export default App;
