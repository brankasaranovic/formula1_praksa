import React from "react";

export default class TeamDetails extends React.Component{

 state = {
    teamDetails: null
 }


 componentDidMount(){
    this.getTeamDetails();
 }

 getTeamDetails = async () => {
    console.log("poruka",this.props);
    let id = this.props;
    const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
    const response = await fetch(url);
    const teamDetails = await response.json();
    console.log("teamsDeatils", teamDetails)
    
    
 };



    render(){
        return(
         <div></div>
        );
    };
}