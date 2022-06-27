import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Teams extends React.Component {

    state = {
        teams: {},
        //isLoading: true
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams = async () => {
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await fetch(url);
        const teams = await response.json();
        console.log("teams", teams);
        this.setState({
            teams: teams,
            //isLoading: false
        });
    }

    /*handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/details/" + id;
        history.push(linkTo);
    }*/

    render() {
        if(this.state.isLoading) {
            return <Loader />
        };

        return (
            <div>
                <h2>Races</h2>
                {this.state.teams.map((team, i) => {
                    return (
                        <div>
                           
                        
                        </div>
                    );
                })}
            </div>
        );
    }
}