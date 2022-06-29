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
            <table>
                <thead>
                    <tr>
                        <td colSpan={4}>Drivers Championship Standings - 2013</td>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.drivers.map(driver => {
                        console.log("driver", driver);
                        return (
                            <tr key={driver.position} onClick={() => this.handleClickDetails(driver.Driver.driverId)}>
                                <td>{driver.position}</td>
                                <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                <td>{driver.Constructors[0].name}</td>
                                <td>{driver.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

