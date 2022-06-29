import React from "react";
import Loader from "./Loader";

export default class RacesDetails extends React.Component {

    state = {
        racesDetails: {},
        isLoading: true
    }

    componentDidMount() {
        this.getRaceDetails();
    }

    getRaceDetails = async () => {
        console.log(this.props.match.params.round);
        const round = this.props.match.params.round;
        const url = `http://ergast.com/api/f1/2013/results/${round}.json`;
        const response = await fetch(url);
        console.log("response", response);
        const details = await response.json();
        console.log("details", details);
        this.setState({
            racesDetails: details,
            isLoading: false
        });
    }

    render() {

        if (this.state.isLoading) {
            return <Loader />;
        };
        console.log("Nas state", this.state.racesDetails);
        return (
            <div>
                <table>
                    <thead>
                        <tr>{this.state.racesDetails.MRData.RaceTable.Races[0].raceName}</tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Country:</td>
                            <td>{this.state.racesDetails.MRData.RaceTable.Races[0].Circuit.Location.country}</td>
                        </tr>
                        <tr>
                            <td>Location:</td>
                            <td>{this.state.racesDetails.MRData.RaceTable.Races[0].Circuit.Location.locality}</td>
                        </tr>
                        <tr>
                            <td>Date:</td>
                            <td> {this.state.racesDetails.MRData.RaceTable.Races[0].date}</td>
                        </tr>
                        <tr>
                            <td><a href={this.state.racesDetails.MRData.RaceTable.Races[0].url}>Full Report</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
}