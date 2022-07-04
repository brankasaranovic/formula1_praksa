import React from "react";
import history from "../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';


export default class Drivers extends React.Component {

    state = {
        drivers: [],
        allFlags: [],
        isLoading: true
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await fetch(url);
        const drivers = await response.json();
        console.log("drivers", drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        const flagUrl = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const flagResult = await fetch(flagUrl);
        const flags = await flagResult.json();

        this.setState({
            drivers: drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            allFlags: flags,
            isLoading: false
        });
    }
    
    getDriverFlag(driver) {
        return this.state.allFlags.find((flag) => flag.nationality.indexOf(driver.Driver.nationality) > -1);
    }

    handleClickDetails = (driverId) => {
        console.log("driverId", driverId);
        const linkTo = "/driver/" + driverId;
        history.push(linkTo);
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };

        return (
            <div className="DriversChampionship-wrapperDiv">

                <h1 className="drivers-title">Drivers Championship</h1>

                <table className="DriversChampionshipStandings-table">
                    <thead>
                        <tr className="raceTable-headerMain">
                            <td colSpan={4}>Drivers Championship Standings - 2013</td>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.drivers.map(driver => {
                            return (
                                <tr key={driver.position} onClick={() => this.handleClickDetails(driver.Driver.driverId)} className="toClick">
                                    <td className="boldNumbers">{driver.position}</td>
                                    <td><div className="driverDetails-raceDetails">
                                            <Flag country={this.getDriverFlag(driver).alpha_2_code} />
                                            <div className="driverDetails-raceName">{driver.Driver.givenName} {driver.Driver.familyName}</div>
                                        </div>
                                       </td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td className="boldNumbers">{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

