import React from "react";
import Loader from "./Loader";
import history from "./../history";
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Breadcrumb from "./Breadcrumb";
import SearchBar from "./SearchBar";

export default class TeamDetails extends React.Component {

   state = {
      teamDetails: null,
      result: [],
      firstFamilyName: null,
      secondFamilyName: null,
      flags: [],
      selectedSeason: null,
      isLoading: true
   }

   componentDidMount() {
      this.getTeamDetails();
   }

   componentDidUpdate() {
      this.getTeamDetails();
   }

   getTeamDetails = async () => {
      const season = localStorage.getItem("selectedSeason");
      if (season === this.state.selectedSeason) {
         return
      }

      console.log("poruka", this.props.match.params.id);
      const id = this.props.match.params.id;
      const url = `http://ergast.com/api/f1/${season}/constructors/${id}/constructorStandings.json`;
      const response = await fetch(url);
      const detail = await response.json();

      const teamDetails = detail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0];
      console.log("detail", detail.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);

      if (!teamDetails) {
         history.push("/");
         window.location.reload();
         return
      }

      const urlRes = `http://ergast.com/api/f1/${season}/constructors/${id}/results.json`;
      const responseRes = await fetch(urlRes);
      const result = await responseRes.json();

      const teamResults = result.MRData.RaceTable.Races;
      console.log("REZULTATI TIMA", teamResults);

      const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
      const responseFlags = await fetch(urlFlags);
      const convertedResponseFlags = await responseFlags.json();
      console.log("convertedResponseFlags", convertedResponseFlags);

      this.setState({
         teamDetails: teamDetails,
         result: teamResults,
         flags: convertedResponseFlags,
         firstFamilyName: result.MRData.RaceTable.Races[0].Results[0].Driver.familyName,
         secondFamilyName: result.MRData.RaceTable.Races[0].Results[1].Driver.familyName,
         selectedSeason: season,
         isLoading: false
      });
   };

   handleClickDetails = (raceId) => {
      console.log("raceId", raceId);
      const linkTo = "/races/" + raceId;
      history.push(linkTo);
   }

   getPositionClass(position) {
      const classes = ["boldNumbers"];

      if (position <= 10) {
         classes.push(`position-${position}`)
      } else {
         classes.push("position-other")
      }

      return classes.join(" ");
   }

   render() {

      if (this.state.isLoading) {
         return (
            <Loader />
         );
      }

      const breadcrumb = [
         {
            title: "/Teams",
            url: "/teams"
         },
         {
            title: this.state.teamDetails.Constructor.constructorId,
            url: "/teamDetail/:id"
         }
      ];

      //console.log("Daj da vidim: ", this.state.teamDetails.Constructor);
      return (

         <div className="driver-details">
            <SearchBar searchProp={this.state.result} />

            {/* leva tabela */}
            <div className="driver-personal-details-div">
               <div className="driver-personal-details-header">
                  <div className="driver-personal-details-profile-image"><img src={`/images/teams/${this.state.teamDetails.Constructor.constructorId}.png`} alt={this.state.teamDetails.Constructor.constructorId} /></div>
                  <div className="driver-personal-details-name">
                     <div className="team-details-flags">
                        {this.state.flags.map((flag, index) => {
                           if (this.state.teamDetails.Constructor.nationality === flag.nationality) {
                              return (<Flag key={index} country={flag.alpha_2_code} />);
                           } else if (this.state.teamDetails.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                              return (<Flag key={index} country="GB" />);
                           } else if (this.state.teamDetails.Constructor.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                              return (<Flag key={index} country="NL" />);
                           }
                        })}
                     </div>
                     <div className="team-name">
                        {this.state.teamDetails.Constructor.name}
                     </div>
                  </div>
               </div>

               <div className="driver-personal-details-table">
                  <table>
                     <tbody>
                        <tr></tr>
                        <tr><td>Country:</td><td>{this.state.teamDetails.Constructor.nationality}</td></tr>
                        <tr><td>Position:</td><td>{this.state.teamDetails.position}</td></tr>
                        <tr><td>Points:</td><td>{this.state.teamDetails.points}</td></tr>
                        <tr><td>History:</td><td><a href={this.state.teamDetails.Constructor.url}><FaExternalLinkAlt color="white" /></a></td></tr>
                     </tbody>
                  </table>
               </div>
            </div>

            {/* desna tabela */}
            <div className="driver-race-details-div">
               <Breadcrumb breadcrumb={breadcrumb} />
               <table className="driver-race-details-table">
                  <thead>
                     <tr className="raceTable-headerUp">
                        <td colSpan={5}>Formula 1 {this.state.season} Results</td>
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
                              <td className="boldNumbers">{result.round}</td>
                              <td onClick={() => this.handleClickDetails(result.round)} className="toClick">
                                 <div className="driverDetails-raceDetails">
                                    {this.state.flags.map((flag, index) => {
                                       if (result.Circuit.Location.country === flag.en_short_name) {
                                          return (<Flag key={index} country={flag.alpha_2_code} />);
                                       } else if (result.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                                          return (<Flag key={index} country="GB" />);
                                       } else if (result.Circuit.Location.country === "Korea" && flag.nationality === "North Korean") {
                                          return (<Flag key={index} country="KP" />);
                                       } else if (result.Circuit.Location.country === "USA" && flag.nationality === "American") {
                                          return (<Flag key={index} country="US" />);
                                       } else if (result.Circuit.Location.country === "Russia" && flag.nationality === "Russian") {
                                          return (<Flag key={index} country="RU" />);
                                       }
                                    })}
                                    <div className="driverDetails-raceName">
                                       {result.raceName}
                                    </div>
                                 </div>
                              </td>
                              <td className={this.getPositionClass(result.Results[0].position)}>{result.Results[0].position}</td>
                              <td className={this.getPositionClass(result.Results[1].position)}>{result.Results[1].position}</td>
                              <td className="boldNumbers">{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
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