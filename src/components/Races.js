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
        console.log("Prikazan flag: ", convertedResponseFlags);
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
            <div className="raceWraperDiv">
             <h1 className="title">Race Calendar</h1>
                <table className="table">
                    <thead>
                        <tr className="tableHeader">
                            <td colSpan={5}>Race calendar - 2013</td>
                        </tr>
                        <tr className="table-header">
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
                                <tr className="grand-prix" key={i} onClick={() => this.handleClickDetails(race.round)}>
                                    <td>{race.round}</td>
                                    <td className="second">
                                        {this.state.flags.map((flag, index) => {
                                            if (race.Circuit.Location.country === flag.en_short_name) {
                                                return (<Flag className="flag" key={index} country={flag.alpha_2_code} />);
                                            } else if (race.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                                                return (<Flag className="flag" key={index} country="GB" />);
                                            } else if (race.Circuit.Location.country === "UAE" && flag.nationality === "Emirati, Emirian, Emiri") {
                                                return (<Flag className="flag" key={index} country="AD" />);
                                            } else if (race.Circuit.Location.country === "USA" && flag.alpha_3_code === "USA") {
                                                return (<Flag className="flag" key={index} country="US" />)
                                            } else if (race.Circuit.Location.country === "Korea" && flag.nationality === "North Korean") {
                                                return (<Flag className="flag" key={index} country="KP" />)
                                            }
                                        })}
                                        {race.raceName}
                                    </td>

                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td className="second">
                                        {this.state.flags.map((flag, index) => {
                                            // console.log("Only for your eyes: ", race.Results[0].Driver.nationality);
                                            if (race.Results[0].Driver.nationality === flag.nationality) {
                                                return (<Flag className="flag" key={index} country={flag.alpha_2_code} />);
                                            } else if (race.Results[0].Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                return (<Flag className="flag" key={index} country="GB" />);
                                            }
                                        })}
                                        {race.Results[0].Driver.familyName}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };
}