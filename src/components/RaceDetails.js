import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import Breadcrumb from "./Breadcrumb";
import history from "../history";
import { FaExternalLinkAlt } from 'react-icons/fa';

export default class RaceDetails extends React.Component {

    state = {
        locationDetails: [],
        raceResult: [],
        raceLocation: [],
        flags: [],
        selectedSeason: null,
        isLoading: true
    }

    componentDidMount() {
        this.getRaceDetails();
    }

    componentDidUpdate() {
        this.getRaceDetails();
    }

    getRaceDetails = async () => {
        const season = localStorage.getItem("selectedSeason")
        if (season === this.state.selectedSeason) {
            return
        }

        console.log(this.props.match.params.round);
        let id = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/${season}/${id}/qualifying.json`;
        const urlResults = `http://ergast.com/api/f1/${season}/${id}/results.json`;

        const response = await fetch(url);
        const qualifiers = await response.json();
        //console.log("qualifiers", qualifiers)

        const response1 = await fetch(urlResults);
        const results = await response1.json();
        //console.log("results", results)

        if (qualifiers.MRData.RaceTable.Races.length === 0) {
            alert("Sorry, we do not have grand prix data for that year. Go back to the Races.");
            history.push("/races");
            window.location.reload();
        }

        const qualifiersDetails = qualifiers.MRData.RaceTable?.Races[0]?.QualifyingResults;
        if (!qualifiersDetails) {
            history.push("/races");
            window.location.reload();
            return
        }

        console.log("Qualifier details are: ", qualifiersDetails)


        const location = qualifiers.MRData.RaceTable.Races;
        const raceResults = results.MRData.RaceTable.Races[0].Results;
        console.log("Race result is: ", raceResults);

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);


        this.setState({
            locationDetails: qualifiersDetails,
            raceResult: raceResults,
            raceLocation: location,
            flags: convertedResponseFlags,
            selectedSeason: season,
            isLoading: false
        })
    }

    setColor = (position) => {
        let color = "";
        //console.log("position", position)
        switch (position) {
            case "25":
                color = "yellow";
                break;
            case "18":
                color = "gray";
                break;
            case "15":
                color = "orange";
                break;
            case "12":
                color = "lightgreen";
                break;
            case "10":
                color = "lightblue";
                break;
            case "8":
                color = "aqua";
                break;
            case "6":
                color = "coral";
                break;
            case "4":
                color = "brown";
                break;
            case "2":
                color = "red";
                break;
            case "1":
                color = "cyan";
                break;
            default:
                color = "darkgrey";
                break;
        }
        return color;
    }

    render() {

        if (this.state.isLoading) {
            return <Loader />;
        };

        const breadcrumb = [
            {
                title: "Races",
                url: "/races"
            },
            {
                title: this.state.raceLocation[0].raceName,
                url: "/races/:round"
            }
        ];
        return (
            <div className="raceDetailsContent">
                <div className="breadcrumbsWrapper">
                    <Breadcrumb breadcrumb={breadcrumb} />
                </div>
                <div className="raceDetailsWraperDiv">
                    <div className="tableRaceDetailsWrapper">
                        <div className="tableRaceDetailsContent">
                            <table className="tableRaceDetails">
                                {this.state.raceLocation.map((location, i) => {
                                    return (
                                        <tbody className="grand-prix-details-wraper" key={i}>
                                            <tr>
                                                <td className="titleDeatils" colSpan={2}>
                                                    {this.state.flags.map((flag, index) => {
                                                        if (location.Circuit.Location.country === flag.en_short_name) {
                                                            return (<Flag width={80} height={80} key={index} country={flag.alpha_2_code} />);
                                                        } else if (location.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                                                            return (<Flag width={80} height={80} key={index} country="GB" />);
                                                        } else if (location.Circuit.Location.country === "UAE" && flag.nationality === "Emirati, Emirian, Emiri") {
                                                            return (<Flag width={80} height={80} key={index} country="AD" />);
                                                        } else if (location.Circuit.Location.country === "USA" && flag.alpha_3_code === "USA") {
                                                            return (<Flag width={80} height={80} key={index} country="US" />)
                                                        } else if (location.Circuit.Location.country === "Korea" && flag.nationality === "North Korean") {
                                                            return (<Flag width={80} height={80} key={index} country="KP" />)
                                                        }
                                                    })}
                                                    <br />
                                                    {location.raceName}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Country:</td><td>{location.Circuit.Location.country}</td>
                                            </tr>
                                            <tr>
                                                <td>Location:</td><td>{location.Circuit.Location.locality}</td>
                                            </tr>
                                            <tr>
                                                <td>Date:</td><td>{location.date}</td>
                                            </tr>
                                            <tr>
                                                <td>Full report:</td><td><a href={location.Circuit.url} className="justForOneLink"><FaExternalLinkAlt /></a></td>
                                            </tr>
                                        </tbody>

                                    );
                                })}
                            </table>
                        </div>
                    </div>
                    
                    <div className="tableQualifyingWrapper">
                        <table className="table-qualifying">
                            <thead>
                                <tr className="qualifying-header">
                                    <th colSpan={5}>Qualifying results</th>
                                </tr>
                                <tr className="qualifying-header-down">
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Best time</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.locationDetails.map((detail, i) => {
                                    let times = [];
                                    times.push(detail.Q1);
                                    times.push(detail.Q2);
                                    times.push(detail.Q3);
                                    times.sort();
                                    //console.log("times", times);

                                    return (
                                        <tr key={i}>
                                            <td className="boldNumbers">{detail.position}</td>
                                            <td className="flag-flex-qualifying">
                                                {this.state.flags.map((flag, index) => {
                                                    if (detail.Driver.nationality === flag.nationality) {
                                                        return (<Flag className="flag1" key={index} country={flag.alpha_2_code} />);
                                                    } else if (detail.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                        return (<Flag className="flag1" key={index} country="GB" />);
                                                    } else if (detail.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                        return (<Flag className="flag1" key={index} country="NL" />);
                                                    }
                                                })}
                                                {detail.Driver.familyName}
                                            </td>
                                            <td> {detail.Constructor.name}</td>
                                            <td className="boldNumbers"> {times[0]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="tableRaceWrapper">
                        <table className="table-race">
                            <thead>
                                <tr className="race-header">
                                    <th colSpan={5}>Race results</th>
                                </tr>
                                <tr className="race-header-down">
                                    <th>Pos</th>
                                    <th>Driver</th>
                                    <th>Team</th>
                                    <th>Result</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.raceResult.map((result, index) => {
                                    //console.log("time", result.Time)
                                    return (
                                        <tr key={index}>
                                            <td className="boldNumbers">{result.position}</td>
                                            <td className="flag-flex-result">
                                                {this.state.flags.map((flag, index) => {
                                                    if (result.Driver.nationality === flag.nationality) {
                                                        return (<Flag className="flag2" key={index} country={flag.alpha_2_code} />);
                                                    } else if (result.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                        return (<Flag className="flag2" key={index} country="GB" />);
                                                    } else if (result.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                        return (<Flag className="flag2" key={index} country="NL" />);
                                                    }
                                                })}
                                                {result.Driver.familyName}
                                            </td>
                                            <td>{result.Constructor.name}</td>
                                            {/* <td>{result.Time !== undefined ? result.Time.time: ""}</td>   */}
                                            <td className="boldNumbers">{result.Time?.time}</td>
                                            <td className="boldNumbers" style={{ "backgroundColor": this.setColor(result.points) }}>{result.points}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}