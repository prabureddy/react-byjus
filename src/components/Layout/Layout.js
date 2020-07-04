import React from "react";
import Navigation from "../Navigation/Navigation";
import Index from "../../containers/Index/Index";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Footer from "../Footer/Footer";
import SignUp from './../../containers/SignUp/SignUp';

const Layout = (props) => {
  return (
    <Router>
      <Navigation />
      <main>
        <Route path="/" exact component={Index} />
        <Route path="/signup/" exact component={SignUp} />
      </main>
      <Footer />
    </Router>
  );
};

export default Layout;
