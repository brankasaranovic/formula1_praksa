import React from "react";

export default class TeamDetails extends React.Component {

   state = {
      teamDetails: null
   }


   componentDidMount() {
      this.getTeamDetails();
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
         teamDetails:teamDetails
      });
      console.log("teamsDeatils", teamDetails.Constructor.nationality);
      console.log("teamsDeatils", teamDetails.position);
      console.log("teamsDeatils", teamDetails.points);





   };



   render() {
      if (!this.state.teamDetails) {
         return(<div></div>);
      }
      return (
         <div>
            <table>
               <tbody>
                  <tr><td colSpan={2}>{this.state.teamDetails.Constructor.nationality}</td></tr>
                  <tr><td>{this.state.teamDetails.position}</td></tr>
                  <tr><td colSpan={2}>{this.state.teamDetails.points}</td></tr>
               </tbody>
            </table>
         </div>
      );
   };
}