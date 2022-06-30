import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Teams extends React.Component {

    state = {
        teams: [],
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

        this.setState({
            teams: teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
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
                                        <td>{team.position}</td>
                                        <td onClick={() => this.handleClickDetails(team.Constructor.constructorId)}>{team.Constructor.constructorId}</td>
                                        <td><a href={team.Constructor.url}>Details</a></td>
                                        <td>{team.points}</td>
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