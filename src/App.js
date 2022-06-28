import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Races from "./components/Races";
import history from "./history";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import DriverDetails from "./components/DriverDetails";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <nav>
                        <ul className="list-items">
                            <li className="items">
                                <Link className="item" to="/">Drivers</Link>
                                <Link className="item" to="/teams">Teams</Link>
                                <Link className="item" to="/races">Races</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/" exact component={Drivers} />
                        <Route path="/details/:id" exact component={DriverDetails} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/races" exact component={Races} />
                    </Switch>
                </Router>
            </div>
        );
    };
}