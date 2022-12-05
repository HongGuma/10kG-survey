/**
 *@title main
 *@date 21-07-30
 *@author 홍수희
 *@desc route
 *@etc(change)
 */
import React from "react";
import { Route, Switch } from "react-router-dom";

import "./css/Main.css";

import tmp from "./component/Main.js";
import CA00 from "./component/CA00.js";
import CA01 from "./component/CA01.js";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={tmp} exact={true} />
        <Route path="/page/00" component={CA00} exact={true} />
        <Route path="/page/00/:applyNum" component={CA00} />
        <Route path="/page/01/:applyNum" component={CA01} />
      </Switch>
    </div>
  );
}

export default App;
