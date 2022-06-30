import React from "react";
import history from "./../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class Races extends React.Component {

    state = {
        races: [],
        flags: [],
        isLoading: true
    }

    componentDidMount() {
        this.getRaces();
    }

    getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await fetch(url);
        console.log("response", response);
        const races = await response.json();
        const convertedRaces = races.MRData.RaceTable.Races;
        console.log("convertedRaces", convertedRaces);

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);

        this.setState({
            races: convertedRaces,
            flags: convertedResponseFlags,
            isLoading: false,
        });

        console.log("Prikazana nacionalnost: ", convertedRaces[0].Circuit.Location.country);
        console.log("Prikazana nacionalnost iz Flag-a: ", convertedResponseFlags[0].en_short_name);
    }

    handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/races/" + id;
        history.push(linkTo);
    }

    render() {

        if (this.state.isLoading) {
            return <Loader />
        };


        return (
            <>
                <h1>Race Calendar</h1>
                <div className="driver-details">
                    <table>
                        <thead>
                            <tr>
                                <td>Race calendar - 2013</td>
                            </tr>
                            <tr>
                                <th>Round</th>
                                <th>Grand Prix</th>
                                <th>Circuit</th>
                                <th>Date</th>
                                <th>Winner</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.races.map((race, i) => {
                                return (
                                    <tr key={i} onClick={() => this.handleClickDetails(race.round)}>
                                        <td>{race.round}</td>
                                        <td>
                                            {this.state.flags.map((flag, index) => {
                                                if (race.Circuit.Location.country === flag.en_short_name) {
                                                    return (<Flag key={index} country={flag.alpha_2_code} />);
                                                } else if (race.Circuit.Location.country === "UK" && flag.nationality=== "British, UK") {
                                                    return (<Flag key={index} country="GB"/>);
                                                }

                                            })}
                                        </td>
                                        <td>{race.Circuit.circuitName}</td>
                                        <td>{race.date}</td>
                                        <td>{race.Results[0].Driver.familyName}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    };
}
