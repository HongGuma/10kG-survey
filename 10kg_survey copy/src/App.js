/**
 2 *@title main
 3 *@date 21-07-30
 4 *@author 홍수희
 5 *@desc route
 6 *@etc(change)
 7 */
import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./css/Main.css";

import tmp from "./component/Main.js";
import CA00 from "./component/CA00.js";
import CA01 from "./component/CA01.js";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/" component={tmp} exact={true} />
        <Route path="/tmp/00" component={CA00} exact={true} />
        <Route path="/tmp/00/:applyNum" component={CA00} />
        <Route path="/tmp/01/:applyNum" component={CA01} />
      </Switch>
    </div>
  );
}

export default App;
