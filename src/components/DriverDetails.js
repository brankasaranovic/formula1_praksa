import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import history from "../history";
import { FaExternalLinkAlt } from 'react-icons/fa';

export default class DriverDetails extends React.Component {

    state = {
        driverId: null,
        driverDetails: null,
        races: [],
        flag: null,
        allFlags: [],
        selectedSeason: null,
        isLoading: true
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    componentDidUpdate() {
        this.getDriverDetails();
    }

    getDriverDetails = async () => {
        const season = localStorage.getItem("selectedSeason");
        if (season === this.state.selectedSeason) {
            return
        }
        // console.log(this.props);
        let id = this.props.match.params.id;

        const url = `http://ergast.com/api/f1/${season}/drivers/${id}/driverStandings.json`;
        const response = await fetch(url);
        const driver = await response.json();
        // console.log("driver", driver.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        const driverDetails = driver.MRData.StandingsTable?.StandingsLists[0]?.DriverStandings[0];

        if (!driverDetails) {
            history.push("/");
            window.location.reload();
            return
        }

        const raceUrl = `https://ergast.com/api/f1/${season}/drivers/${id}/results.json`;
        const raceResult = await fetch(raceUrl);
        const races = await raceResult.json();
        const driverRaces = races.MRData.RaceTable.Races;
        //console.log(driverRaces);

        const flagUrl = `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`;
        const flagResult = await fetch(flagUrl);
        const flags = await flagResult.json();


        const driverFlag = flags.find((flag) => flag.nationality.indexOf(driverDetails.Driver.nationality) > -1);
        //console.log(driverFlag);


        this.setState({
            driverId: id,
            driverDetails: driverDetails,
            races: driverRaces,
            flag: driverFlag,
            allFlags: flags,
            selectedSeason: season,
            isLoading: false
        });
    }

    getPositionClass(position) {
        let classes = ["boldNumbers "];

        if (position <= 10) {
            classes.push(`position-${position}`);
        } else {
            classes.push("position-other");
        }

        return classes.join(" ");
    }

    render() {
        
        if (this.state.isLoading) {
            return <Loader/>;
        }

        return (
            <div className="driver-details">

                {/* leva tabela */}
                <div className="driver-personal-details-div">
                    <div className="driver-personal-details-header">
                        
                        <div className="driver-personal-details-profile-image">
                            <img src={`/images/drivers/${this.state.driverId}.jpg`} alt={this.state.driverId} />
                        </div>
                        
                        <div className="driver-personal-details-name">
                            <div>
                                <Flag country={this.state.flag.alpha_2_code}/>
                            </div>
                            <div>{this.state.driverDetails.Driver.givenName} {this.state.driverDetails.Driver.familyName}</div>                            
                        </div>
                    </div>
                    <div className="driver-personal-details-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Country:</td>
                                    <td>{this.state.driverDetails.Driver.nationality}</td>
                                </tr>

                                <tr>
                                    <td>Team:</td>
                                    <td>{this.state.driverDetails.Constructors[0].name}</td>
                                </tr>
                                <tr>
                                    <td>Birth:</td>
                                    <td>{this.state.driverDetails.Driver.dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Biography:</td>
                                    <td><a href={this.state.driverDetails.Driver.url}><FaExternalLinkAlt color="white" /></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* desna tabela */}
                <div className="driver-race-details-div">
                    <table className="driver-race-details-table">
                        <thead>
                            <tr className="raceTable-headerUp">
                                <td colSpan={5}>Formula 1 {this.state.selectedSeason} Results</td>
                            </tr>
                            <tr className="raceTable-headerDown">
                                <td>Round</td>
                                <td>Grand Prix</td>
                                <td>Team</td>
                                <td>Grid</td>
                                <td>Race</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.races.map(race => {
                                //console.log("race", race);
                                return (
                                    <tr key={race.round}>
                                        <td className="boldNumbers">{race.round}</td>
                                        <td><div className="driverDetails-raceDetails">
                                            {this.state.allFlags.map((flag, index) => {
                                                if (race.Circuit.Location.country === flag.en_short_name) {
                                                    return (<Flag key={index} country={flag.alpha_2_code} />);
                                                } else if (race.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                                                    return (<Flag key={index} country="GB" />);
                                                } else if (race.Circuit.Location.country === "UAE" && flag.nationality === "Emirati, Emirian, Emiri") {
                                                    return (<Flag key={index} country="AD" />);
                                                } else if (race.Circuit.Location.country === "USA" && flag.alpha_3_code === "USA") {
                                                    return (<Flag key={index} country="US" />)
                                                } else if (race.Circuit.Location.country === "Korea" && flag.nationality === "North Korean") {
                                                    return (<Flag key={index} country="KP" />)
                                                }
                                            })}
                                            <div className="driverDetails-raceName">{race.raceName}</div>
                                        </div></td>
                                        <td>{race.Results[0].Constructor.name}</td>
                                        <td className="boldNumbers">{race.Results[0].grid}</td>
                                        <td className={this.getPositionClass(race.Results[0].position)}>{race.Results[0].position}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}