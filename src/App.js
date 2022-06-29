import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Races from "./components/Races";
import history from "./history";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";

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
                        <Route path="/driver/:id" exact component={DriverDetails} />
                        <Route path="/teamDetail/:id" exact component={TeamDetails} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/races" exact component={Races} />
                        {/* <Route path="/races/:round" exact component={RacesDetails} /> */}
                    </Switch>
                </Router>
            </div>
        );
    };
}