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
import { faHelmetSafety, faPeopleLine, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";

export default class App extends React.Component {    
    render() {
        return (
            <div className="main-route">
                <Router history={history}>
                    <div className="logo-wraper">
                        <img className="logo" src={require('./css/img/logo.png').default} />
                        <div className="seasonSelectionWrapper">
                            <select onChange={this.seasonChanged} value={this.state.selectedSeason}>
                                {this.state.seasons.map((season) => {
                                    return (<option key={season.season}>{season.season}</option>)
                                })}
                            </select>
                        </div>
                        <nav className="navigation">
                            <ul className="list-items">
                                <li className="items">
                                    <Link className="item" to="/">
                                        <div className="iconsDiv">
                                            <FontAwesomeIcon className="icons" icon={faHelmetSafety} />
                                            <span className="itemText">Drivers</span>
                                        </div>
                                    </Link>
                                    <Link className="item" to="/teams">
                                        <div className="iconsDiv">
                                            <FontAwesomeIcon className="icons" icon={faPeopleLine} />
                                            <span className="itemText">Teams</span>
                                        </div>
                                    </Link>
                                    <Link className="item" to="/races">
                                        <div className="iconsDiv">
                                            <FontAwesomeIcon className="icons" icon={faFlagCheckered} />
                                            <span className="itemText">Races</span>
                                        </div>
                                    </Link>
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