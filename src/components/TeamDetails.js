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
      const teamDetails = await response.json();
      console.log("teamsDeatils", teamDetails.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor.nationality);


   };



   render() {
      return (
         <div></div>
      );
   };
}