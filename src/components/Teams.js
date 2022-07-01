import React from "react";
import history from "../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default class Teams extends React.Component {

    state = {
        teams: [],
        flags: [],
        isLoading: true
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await fetch(url);
        const teams = await response.json();
        console.log("teams", teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);

        this.setState({
            teams: teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            flags: convertedResponseFlags,
            isLoading: false
        });
    }

    handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/teamDetail/" + id;
        history.push(linkTo);
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };

        return (
            <div className="driver-details">

                <div className="driver-race-details-div">
                    <h1 className="drivers-title">Constructors Campionship</h1>

                    <table className="driver-race-details-table">
                        <thead>
                            <tr className="raceTable-headerUp">
                                <td colSpan={4}>Constructors Championship Standings - 2013</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map((team, i) => {
                                console.log("team", team);
                                return (
                                    <tr key={i}>
                                        <td className="boldNumbers">{team.position}</td>
                                        <td onClick={() => this.handleClickDetails(team.Constructor.constructorId)} className="toClick teams-alignment">
                                            <div>
                                                {this.state.flags.map((flag, index) => {
                                                    if (team.Constructor.nationality === flag.nationality) {
                                                        return (<Flag key={index} country={flag.alpha_2_code} />);
                                                    } else if (team.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                                        return (<Flag key={index} country="GB" />);
                                                    }
                                                })}
                                            </div>
                                            <div className="team-name-shift-right">
                                                {team.Constructor.name}
                                            </div>
                                        </td>
                                        <td><a href={team.Constructor.url} className="teams-links">Details <FaExternalLinkAlt /></a></td>
                                        <td className="boldNumbers">{team.points}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}