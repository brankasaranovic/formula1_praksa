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
    
    const url = `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`;
    
    
    let id = this.props;
 };



    render(){
        return(
         <div></div>
        );
    };
}