import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Drivers extends React.Component {

    state = {
        drivers: [],
        //isLoading: true
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await fetch(url);
        const drivers = await response.json();
        console.log("drivers", drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        const allDrivers = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        this.setState({
            drivers: allDrivers
            //isLoading: false
        });
    }

    /*handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/details/" + id;
        history.push(linkTo);
    }*/

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };
        console.log(this.state.drivers)
        return (
            <table>
                <thead>
                    <tr>
                        <td>Test</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>Drivers Championship Standings - 2013</tr>
                    {this.state.drivers.map((driver, i) => {
                        console.log("drivers", driver);
                        return (
                            <tr>
                                <td>{driver.position}</td>
                                <td>{driver.Driver.givenName}</td>
                                <td>{driver.Driver.familyName}</td>
                                <td>{driver.Constructors[0].constructorId}</td>
                                <td>{driver.points}</td>
                                <td></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}


