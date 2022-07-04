import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import Races from "./components/Races";
import history from "./history";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHelmetSafety } from "@fortawesome/free-solid-svg-icons";
import { faPeopleLine } from "@fortawesome/free-solid-svg-icons";
import { faFlagCheckered } from "@fortawesome/free-solid-svg-icons";



export default class App extends React.Component {
    render() {
        return (
            <div className="main-route">
                <Router history={history}>
                    <div className="logo-wraper">
                        <img src={require('./css/img/logo.png').default} width={250} />
                        <nav className="navigation">
                            <ul className="list-items">
                                <li className="items">
                                    <div className="iconsDiv">  <FontAwesomeIcon className="item icons" icon={faHelmetSafety} />
                                    <Link className="item" to="/">Drivers</Link>
                                    </div>
                                    <div className="iconsDiv">
                                    <FontAwesomeIcon className="item icons" icon={faPeopleLine} />
                                    <Link className="item" to="/teams">Teams</Link>
                                    </div>
                                   <div className="iconsDiv">
                                   <FontAwesomeIcon className="item icons" icon={faFlagCheckered} />
                                    <Link className="item" to="/races">Races</Link>
                                   </div>
                                  
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Drivers} />
                        <Route path="/driver/:id" exact component={DriverDetails} />
                        <Route path="/teamDetail/:id" exact component={TeamDetails} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/races" exact component={Races} />
                        <Route path="/races/:round" exact component={RaceDetails} />
                    </Switch>
                </Router>
            </div>
        );
    };
}