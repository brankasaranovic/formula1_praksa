import React from "react";
import Loader from "./Loader";

export default class RacesDetails extends React.Component {

    state = {
        racesDetails: {},
        qualifyingResults: [],
        raceResults: [],
        isLoading: true,
        raceNo: null
    }

    componentDidMount() {
        this.getRaceDetails();
        this.getQualifyingResults();
        this.getRaceResults();
    }

    getRaceDetails = async () => {
        console.log(this.props.match.params.round);
        const round = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/2013/results/1.json`;
        const response = await fetch(url);
        console.log("response", response);
        const details = await response.json();
        console.log("details", details);
        this.setState({
            racesDetails: details,
            isLoading: false,
            raceNo: round
        });
    }

    getQualifyingResults = async () => {
        const round = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/2013/${round}/qualifying.json`;
        const response = await fetch(url);
        const qualifies = await response.json();
        console.info("Qualifies", qualifies);
        let qualifyingResults = qualifies.MRData.RaceTable.Races[0].QualifyingResults;
        this.setState({
            qualifyingResults: qualifyingResults
        });
    }

    getRaceResults = async () => {
        const round = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/2013/${round}/results.json`;
        const response = await fetch(url);
        const results = await response.json();
        console.log("RaceResults", results);
        let raceResults = results.MRData.RaceTable.Races[0].Results;
        this.setState({
            raceResults: raceResults
        });
    }

    render() {

        if (this.state.isLoading) {
            return <Loader />;
        };
        console.log("Nas state", this.state.racesDetails);
        console.log("Runda",this.state.raceNo);
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={2}>{this.state.racesDetails.MRData.RaceTable.Races[this.state.raceNo - 1].raceName}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Country:</td>
                            <td>{this.state.racesDetails.MRData.RaceTable.Races[this.state.raceNo - 1].Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td>{this.state.racesDetails.MRData.RaceTable.Races[this.state.raceNo - 1].Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td> {this.state.racesDetails.MRData.RaceTable.Races[this.state.raceNo - 1].date}</td>
                        </tr>
                        <tr>
                            <td><a href={this.state.racesDetails.MRData.RaceTable.Races[this.state.raceNo - 1].url}>Full Report</a></td>
                        </tr>
                    </tbody>
                </table>

                {/* desna prva tabela */}
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
                </table>

                {/* desna druga tabela */}
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
                </table>
            </div>
        );
    };
}