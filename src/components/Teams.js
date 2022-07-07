import React from "react";
import history from "../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { FaExternalLinkAlt } from 'react-icons/fa';
//import SearchBar from "./SearchBar";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";

export default class Teams extends React.Component {

    state = {
        teams: [],
        flags: [],
        selectedSeason: null,
        isLoading: true,
        searchApiData: [],
        filterValue: ""
    }

    componentDidMount() {
        this.getTeams();
    }

    componentDidUpdate() {
        this.getTeams();
    }

    getTeams = async () => {
        const season = localStorage.getItem("selectedSeason")
        if (season === this.state.selectedSeason) {
            return
        }

        const url = `http://ergast.com/api/f1/${season}/constructorStandings.json`;
        const response = await fetch(url);
        const teams = await response.json();
        console.log("teams", teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);

        this.setState({
            teams: teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
            flags: convertedResponseFlags,
            selectedSeason: season,
            isLoading: false,
            searchApiData: teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
        });
    }

    handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/teamDetail/" + id;
        history.push(linkTo);
    }

    handleFilter = (searchText) => {
        if (searchText.target.value == "") {
            return this.setState({
                teams: this.state.searchApiData,
            });
        } else {
            const filterResult = this.state.searchApiData.filter(
                (teams) => teams.position.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    teams.Constructor.constructorId.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    teams.Constructors[0].name.toLowerCase().includes(searchText.target.value.toLowerCase()) || teams.Constructor.url.toLowerCase().includes(searchText.target.value.toLowerCase())
            );
            this.setState({
                teams: filterResult,
            });
        }
    };

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };

        const breadcrumb = [
            {
                title: "/Teams",
                url: "/teams"
            }
        ];

        return (
            <div className="driver-details">
                {/* <Breadcrumb breadcrumb={breadcrumb} /> */}
                {/* <SearchBar searchProp={this.state.teams}/> */}

                <div className="driver-race-details-div">
                    <Breadcrumb breadcrumb={breadcrumb} />
                    <Search filterValue={this.state.filterValue} handleFilter={this.handleFilter} />
                    <h1 className="drivers-title">Constructors Campionship</h1>

                    <table className="driver-race-details-table teams-table">
                        <thead>
                            <tr className="raceTable-headerUp">
                                <td colSpan={4}>Constructors Championship Standings - {this.state.selectedSeason}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.teams.map((team, i) => {
                                console.log("team", team);
                                return (
                                    <tr key={i}>
                                        <td className="boldNumbers">{team.position}</td>
                                        <td onClick={() => this.handleClickDetails(team.Constructor.constructorId)} className="toClick">
                                            <div className="driverDetails-raceDetails">
                                                {this.state.flags.map((flag, index) => {
                                                    if (team.Constructor.nationality === flag.nationality) {
                                                        return (<Flag key={index} country={flag.alpha_2_code} />);
                                                    } else if (team.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                                        return (<Flag key={index} country="GB" />);
                                                    } else if (team.Constructor.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                        return (<Flag key={index} country="NL" />);
                                                    }
                                                })}
                                                <div className="driverDetails-raceName">
                                                    {team.Constructor.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td><a href={team.Constructor.url} className="teams-links">Details <FaExternalLinkAlt /></a></td>
                                        <td className="boldNumbers">{team.points}</td>
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