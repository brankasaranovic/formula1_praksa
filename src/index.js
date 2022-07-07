import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; //export default
import "bootstrap/dist/css/bootstrap.min.css";

import "./css/main.css";

var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);