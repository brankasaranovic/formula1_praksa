import React from "react";
import history from "../history";
import Loader from "./Loader";


export default class Drivers extends React.Component {

    state = {
        drivers: [],
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

        this.setState({
            drivers: drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            isLoading: false
        });
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
                            console.log(driver.Driver.driverId, driver.Driver.givenName, driver.Driver.familyName);
                            return (
                                <tr key={driver.position} onClick={() => this.handleClickDetails(driver.Driver.driverId)}>
                                    <td className="boldNumbers">{driver.position}</td>
                                    <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
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

