import "./App.css";
import React from "react";
import Demo from "./components/demo";
import Signin from "./components/SignIn/SignIn";
import "./library";

function App() {
  return (
    <React.Fragment>
      <h1>Home Page</h1>
      <Demo />
      <Signin />
    </React.Fragment>
  );
}

export default App;
