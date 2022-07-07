import React from "react";
import history from "../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";


export default class Drivers extends React.Component {

    state = {
        drivers: [],
        allFlags: [],
        selectedSeason: null,
        isLoading: true,
        searchApiData: [],
        filterValue: ""
    }

    componentDidMount() {
        this.getDrivers();
    }

    componentDidUpdate() {
        this.getDrivers();
    }

    getDrivers = async () => {
        const season = localStorage.getItem("selectedSeason")
        if (season === this.state.selectedSeason) {
            return
        }
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
            isLoading: false,
            searchApiData: drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings
        });
    }

    getDriverFlag(driver) {
        let nationality = driver.Driver.nationality
        if (nationality === "Monegasque") {
            nationality = "Monacan"
        } else if (nationality === "New Zealander") {
            nationality = "New Zealand"
        }
        return this.state.allFlags.find((flag) => flag.nationality.indexOf(nationality) > -1);
    }

    handleClickDetails = (driverId) => {
        //console.log("driverId", driverId);
        const linkTo = "/driver/" + driverId;
        history.push(linkTo);
    }

    handleFilter = (searchText) => {
        if (searchText.target.value == "") {
            return this.setState({
                drivers: this.state.searchApiData,
            });
        } else {
            const filterResult = this.state.searchApiData.filter(
                (drivers) => drivers.Driver.givenName.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    drivers.Driver.familyName.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    drivers.Constructors[0].name.toLowerCase().includes(searchText.target.value.toLowerCase())
            );
            this.setState({
                drivers: filterResult,
            });
        }
    };

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };

        const breadcrumb = [
            {
                title: "/Drivers",
                url: "/"
            }
        ];

        return (
            <div className="DriversChampionship-wrapperDiv">
                <Breadcrumb breadcrumb={breadcrumb} />
                <Search filterValue={this.state.filterValue} handleFilter={this.handleFilter} />

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

