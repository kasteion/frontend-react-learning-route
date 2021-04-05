import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Badges from "../pages/Badges";
import BadgeNew from "../pages/BadgeNew";
import BadgeDetailsContainer from "../pages/BadgeDetailsContainer";
import BadgeEdit from "../pages/BadgeEdit";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Layout from "../components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/badges">
            <Badges />
          </Route>
          <Route exact path="/badges/new" children={<BadgeNew />} />
          <Route exact path="/badges/:badgeId">
            <BadgeDetailsContainer />
          </Route>
          <Route exact path="/badges/:badgeId/edit">
            <BadgeEdit />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
