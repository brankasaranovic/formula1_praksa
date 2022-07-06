import React from "react";
import history from "../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';


export default class Drivers extends React.Component {

    state = {
        drivers: [],
        allFlags: [],
        selectedSeason: null,
        isLoading: true
    }

    componentDidUpdate() {
        const season = localStorage.getItem("selectedSeason")
        if (season !== this.state.selectedSeason) {
            this.getDrivers(season);
        }
    }

    getDrivers = async (season) => {
        const url = `http://ergast.com/api/f1/${season}/driverStandings.json`;
        const response = await fetch(url);
        const drivers = await response.json();
        //console.log("drivers", drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);

        const flagUrl = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const flagResult = await fetch(flagUrl);
        const flags = await flagResult.json();

        this.setState({
            drivers: drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings,
            allFlags: flags,
            selectedSeason: season,
            isLoading: false
        });
    }
    
    getDriverFlag(driver) {
        let nationality = driver.Driver.nationality
        if (nationality === "Monegasque") {
            nationality = "Monacan"
        }
        return this.state.allFlags.find((flag) => flag.nationality.indexOf(nationality) > -1);
    }

    handleClickDetails = (driverId) => {
        //console.log("driverId", driverId);
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
                            <td colSpan={4}>Drivers Championship Standings - {this.state.selectedSeason}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map(driver => {
                            return (
                                <tr key={driver.position} onClick={() => this.handleClickDetails(driver.Driver.driverId)} className="toClick">
                                    <td className="boldNumbers">{driver.position}</td>
                                    <td><div className="driverDetails-raceDetails">
                                            {(() => {
                                                let flag = this.getDriverFlag(driver);
                                                if (flag) {
                                                    return (<Flag country={flag.alpha_2_code} />)
                                                } else {
                                                    return `[${driver.Driver.nationality}]`
                                                }
                                            })()}
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

