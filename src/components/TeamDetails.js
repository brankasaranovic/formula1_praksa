import React from "react";
import Loader from "./Loader";

export default class TeamDetails extends React.Component {

   state = {
      teamDetails: null,
      result: [],
      firstFamilyName: null,
      secondFamilyName: null,
      isLoading: true
   }


   componentDidMount() {
      this.getTeamDetails();
      this.getResults();
   }

   getTeamDetails = async () => {
      console.log("poruka", this.props.match.params.id);
      let id = this.props.match.params.id;
      const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
      const response = await fetch(url);
      const detail = await response.json();


      const teamDetails = detail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
      console.log("detail", detail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);

      this.setState({
         teamDetails: teamDetails
      });
      console.log("teamsDeatils", teamDetails.Constructor.nationality);
      console.log("teamsDeatils", teamDetails.position);
      console.log("teamsDeatils", teamDetails.points);
   };

   getResults = async () => {
      console.log("REZULTATI", this.props.match.params.id);
      let id = this.props.match.params.id;
      const url = `http://ergast.com/api/f1/2013/constructors/${id}/results.json`;
      const response = await fetch(url);
      const result = await response.json();

      let teamResults = result.MRData.RaceTable.Races;
      console.log("REZULTATI TIMA", teamResults);

      // nisam mogao drugacije da se snadjem da za nazive kolona stoje prezimena vozaca sem da ubacim jos dva state-a
      this.setState({
         result: teamResults,
         isLoading: false,
         firstFamilyName: result.MRData.RaceTable.Races[0].Results[0].Driver.familyName,
         secondFamilyName: result.MRData.RaceTable.Races[0].Results[1].Driver.familyName
      });

   }

   render() {

      if (this.state.isLoading) {
         return (
            <Loader />
         );
      }

      return (

         <div className="driver-details">

            {/* leva tabela */}
            <div className="driver-personal-details-div">
               <div className="driver-personal-details-table">
                  <table>
                     <tbody>
                        <tr><td colSpan={2}>{this.state.teamDetails.Constructor.name}</td></tr>
                        <tr><td>Country:</td><td>{this.state.teamDetails.Constructor.nationality}</td></tr>
                        <tr><td>Position:</td><td>{this.state.teamDetails.position}</td></tr>
                        <tr><td>Points:</td><td>{this.state.teamDetails.points}</td></tr>
                        <tr><td>History:</td><td><a href={this.state.teamDetails.Constructor.url}>el icon</a></td></tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* desna tabela */}
            <div className="driver-race-details-div">
               <table className="driver-race-details-table">
                  <thead>
                     <tr className="raceTable-headerUp">
                        <td colSpan={5}>Formula 1 2013 Results</td>
                     </tr>
                     <tr className="raceTable-headerDown">
                        <td>Round</td>
                        <td>Grand Prix</td>
                        <td>{this.state.firstFamilyName}</td>
                        <td>{this.state.secondFamilyName}</td>
                        <td>Points</td>
                     </tr>
                  </thead>
                  <tbody>
                     {this.state.result.map(result => {
                        return (
                           <tr key={result.round}>
                              <td>{result.round}</td>
                              <td>{result.raceName}</td>
                              <td>{result.Results[0].position}</td>
                              <td>{result.Results[1].position}</td>
                              <td>{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
         </div>
      );
   };
}