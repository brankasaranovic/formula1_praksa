import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Teams extends React.Component {

  state = {
    teams: []
    //isLoading: true
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
      teams: teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
      //isLoading: false
    });
  }

  /*handleClickDetails = (id) => {
      console.log("id", id);
      const linkTo = "/details/" + id;
      history.push(linkTo);
  }*/

  render() {

    return (
      <>
        <h1>Constructors Campionship</h1>
        <h3>Constructors Championship Standings - 2013</h3>
       
        {this.state.teams.map( (team, i) => {
          return (
            <div key = {i}>
              <table className = "table">
                <tbody>
                  <tr>
                    <td>{team.position}</td>
                    <td>{team.Constructor.constructorId}</td>
                    <td><a href={team.Constructor.url}>Details</a></td>
                    <td>{team.points}</td>
                  </tr>
                  </tbody>
             </table>
            </div>
          );
        })}
      </>
    )}}
