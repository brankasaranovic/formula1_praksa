import React from "react";
import Loader from "./Loader";

export default class RaceDetails extends React.Component {

    state = {
        locationDetails: [],
        raceResult: [],
        raceLocation: [],
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


        this.setState({
            locationDetails: qualifiersDetails,
            raceResult: raceResults,
            raceLocation: location,
            isLoading: false
        })
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        };
        return (
            <div className="driver-details">
                <table>
                    {this.state.raceLocation.map((location, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <tr> <td>{location.raceName}</td></tr>
                                    <tr><td>Country: {location.Circuit.Location.country}</td></tr>
                                    <tr><td>Location: {location.Circuit.Location.locality}</td></tr>
                                    <tr><td>Date: {location.date}</td></tr>
                                    <tr><td><a href={location.Circuit.url}>Full report </a></td></tr>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>

                <table>
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
                        console.log("times", times);

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

                <table>
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
                        console.log("time", result.Time)
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