import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Races from "./components/Races";
import history from "./history";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Drivers</Link>
                                <Link to="/teams">Teams</Link>
                                <Link to="/races">Races</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/" exact component={Drivers} />
                        <Route path="/" exact component={Teams} />
                        <Route path="/" exact component={Races} />
                    </Switch>
                </Router>
            </div>
        );
    };
}