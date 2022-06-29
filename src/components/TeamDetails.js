import React from "react";
import Loader from "./Loader";

export default class TeamDetails extends React.Component {

   state = {
      teamDetails: null,
      //results: [],
      isLoading: true
   }


   componentDidMount() {
      this.getTeamDetails();
      //this.getResults();
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
         teamDetails:teamDetails,
         isLoading: false
      });
      console.log("teamsDeatils", teamDetails.Constructor.nationality);
      console.log("teamsDeatils", teamDetails.position);
      console.log("teamsDeatils", teamDetails.points);
   };

   // getResults = () => {
   //    console.log("poruka", this.props.match.params.id);
   //    const url = "http://ergast.com/api/f1/2013/constructors/id/results.json";
   //    const response = await fetch(url);
   //    const result = await response.json();
   //    console.log("result", result);
   //    this.setState({
   //       results: result,
   //       isLoading: false
   //    });
   // }

   render() {     

      if(this.state.isLoading) {
         return(
            <Loader />
         );
      }

      if (!this.state.teamDetails) {
         return(<div></div>);
      }
      
      return (
         <div>
            <table>
               <tbody>
                  <tr><td>Country: {this.state.teamDetails.Constructor.nationality}</td></tr>
                  <tr><td>Position: {this.state.teamDetails.position}</td></tr>
                  <tr><td>Points: {this.state.teamDetails.points}</td></tr>
                  <tr><td><a href = {this.state.teamDetails.Constructor.url}>History:</a></td></tr>
               </tbody>
            </table>

            <table>

            </table>
         </div>
      );
   };
}