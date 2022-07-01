import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class RaceDetails extends React.Component {

    state = {
        locationDetails: [],
        raceResult: [],
        raceLocation: [],
        flags: [],
        isLoading: true
    }

    componentDidMount() {
        this.getRaceDetails();
    }

    getRaceDetails = async () => {
        console.log(this.props.match.params.round);
        let id = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/2013/${id}/qualifying.json`;
        const urlResults = `http://ergast.com/api/f1/2013/${id}/results.json`;

        const response = await fetch(url);
        const qualifiers = await response.json();
        console.log("qualifiers", qualifiers)

        const response1 = await fetch(urlResults);
        const results = await response1.json();
        console.log("results", results)


        const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
        console.log("qualifiers", qualifiersDetails)


        const location = qualifiers.MRData.RaceTable.Races;
        const raceResults = results.MRData.RaceTable.Races[0].Results;

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);


        this.setState({
            locationDetails: qualifiersDetails,
            raceResult: raceResults,
            raceLocation: location,
            flags: convertedResponseFlags,
            isLoading: false
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        };
        return (
            <div className="raceDetailsWraperDiv">
                <table className="tableRaceDetails">
                    {this.state.raceLocation.map((location, i) => {
                        return (
                            <tbody className="grand-prix-details-wraper" key={i}>
                                <tr className="grand-prix-details">
                                    <p className="titleDeatils">{location.raceName}</p> 
                                    <p>Country: {location.Circuit.Location.country}</p>
                                    <p>Location: {location.Circuit.Location.locality}</p>
                                    <p>Date: {location.date}</p> 
                                    <p><a href={location.Circuit.url}>Full report </a></p>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                <table className="table-qualifying-results">
                    <thead>
                        <tr><th>Qualifying result</th></tr>
                        <tr>
                            <td>Pos</td>
                            <td>Driver</td>
                            <td>Team</td>
                            <td>Best time</td>
                        </tr>
                    </thead>

                    {this.state.locationDetails.map((detail, i) => {
                        let times = [];
                        times.push(detail.Q1);
                        times.push(detail.Q2);
                        times.push(detail.Q3);
                        times.sort();
                        //console.log("times", times);

                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{detail.position}</td>
                                    <td> {detail.Driver.familyName}</td>
                                    <td> {detail.Constructor.name}</td>
                                    <td> {times[0]}</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                <table className="table-race-results">
                    <thead>
                        <tr>
                            <th>Race results</th>
                        </tr>
                        <tr>
                            <th>Pos</th>
                            <th>Driver</th>
                            <th>Team</th>
                            <th>Result</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    {this.state.raceResult.map((result, index) => {
                        //console.log("time", result.Time)
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{result.position}</td>
                                    <td>{result.Driver.familyName}</td>
                                    <td>{result.Constructor.name}</td>
                                     {/* <td>{result.Time !== undefined ? result.Time.time: ""}</td>   */}
                                    <td>{result.Time?.time}</td>
                                    <td>{result.points}</td>
                                </tr>
                            </tbody>
                        );
                    })}

                </table>

                {/* desna prva tabela
                <h2>Qualifying Results</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Pos</td>
                            <td>Driver</td>
                            <td>Team</td>
                            <td>Best Time</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.qualifyingResults.map(result => {
                        return (
                           <tr key={result.position}>
                              <td>{result.position}</td>
                              <td>{result.Driver.familyName}</td>
                              <td>{result.Constructor.name}</td>
                              <td>{(result.Q3!=null) ? result.Q3 : ((result.Q2!=null) ? result.Q2 : result.Q1)}</td>
                           </tr>
                        );
                     })}
                    </tbody>
                </table> */}

                {/* desna druga tabela
                <h2>Race Results</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Pos</td>
                            <td>Driver</td>
                            <td>Team</td>
                            <td>Result</td>
                            <td>Points</td>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.raceResults.map(result => {
                        return (
                           <tr key={result.position}>
                              <td>{result.position}</td>
                              <td>{result.Driver.familyName}</td>
                              <td>{result.Constructor.name}</td>
                              <td>{(result.Time != undefined) ? result.Time.time : ""}</td>
                              <td>{result.points}</td>
                           </tr>
                        );
                     })}
                    </tbody>
                </table> */}
            </div>
        );
    }
}