import React from "react";
import { Route, Redirect } from "react-router-dom";
import Random from "./Random";
import Gallery from './components/Gallery/Gallery';

export default function Content() {
  return (
    <div className="content">
      <Route path="/gallery" component={Gallery} />
      <Route path="/random/" component={Random} />
      <Route path="/" exact render={() => <Redirect to="/random" />} />
    </div>
  );
}
