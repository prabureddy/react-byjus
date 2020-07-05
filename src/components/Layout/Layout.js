import React from "react";
import Navigation from "../Navigation/Navigation";
import Index from "../../containers/Index/Index";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "../Footer/Footer";
import SignUp from "./../../containers/SignUp/SignUp";
import NotFound from './../../containers/NotFound/NotFound';

const Layout = (props) => {
  return (
    <Router>
      <Navigation />
      <main>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/signup/" exact component={SignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default Layout;
