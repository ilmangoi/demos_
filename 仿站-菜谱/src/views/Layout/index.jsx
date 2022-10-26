import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import PageFooter from "@/component/pageFooter";

import Home from "@/views/Home";
import Category from "@/views/Category";
import CookMap from "@/views/CookMap";
import Center from "@/views/Center";

const Layout = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/category" component={Category} />
        <Route path="/map" component={CookMap} />
        <Route path="/center" component={Center} />
        <Redirect exact from="/" to="/home" />
      </Switch>
      <PageFooter show={true} />
    </Fragment>
  );
};

export default Layout;
