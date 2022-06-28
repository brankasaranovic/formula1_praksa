import React from "react";
import history from "../history";
import Loader from "./Loader";


export default class Drivers extends React.Component {

    state = {
        drivers: []
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

        this.setState({
            drivers: drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings
            //isLoading: false
        });
    }

    handleClickDetails = (i) => {
        console.log("i", i);
        const linkTo = "/details/i";
        history.push(linkTo);
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };

        return (
            <>
                <h1>Drivers Championship</h1>
                <h3>Drivers Championship Standings - 2013</h3>

                {this.state.drivers.map((driver, i) => {
                    return (
                        <div key={i} onClick={() => this.handleClickDetails(i)}>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>{driver.position}</td>
                                        <td>{driver.Driver.givenName}</td>
                                        <td>{driver.Driver.familyName}</td>
                                        <td>{driver.Constructors[0].constructorId}</td>
                                        <td>{driver.points}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                })}

            </>
        )
    }
}

