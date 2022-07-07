import React from "react";
import history from "./../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";

export default class Races extends React.Component {

    state = {
        races: [],
        flags: [],
        isLoading: true,
        searchApiData: [],
        filterValue: "",
        selectedSeason: null
    }

    componentDidMount() {
        this.getRaces();
    }

    componentDidUpdate() {
        this.getRaces();
    }

    getRaces = async () => {
        const season = localStorage.getItem("selectedSeason")
        if (season === this.state.selectedSeason) {
            return
        }
        const url = `http://ergast.com/api/f1/${season}/results/1.json`;
        const response = await fetch(url);
        console.log("response", response);
        const races = await response.json();
        const convertedRaces = races.MRData.RaceTable.Races;
        console.log("convertedRaces", convertedRaces);

        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const responseFlags = await fetch(urlFlags);
        const convertedResponseFlags = await responseFlags.json();
        console.log("convertedResponseFlags", convertedResponseFlags);

        this.setState({
            races: convertedRaces,
            flags: convertedResponseFlags,
            selectedSeason: season,
            isLoading: false,
            searchApiData: convertedRaces
        });

        console.log("Prikazana nacionalnost: ", convertedRaces[0].Circuit.Location.country);
        console.log("Prikazana nacionalnost iz Flag-a: ", convertedResponseFlags[0].en_short_name);
        console.log("Prikazan flag: ", convertedResponseFlags);
    }

    handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/races/" + id;
        history.push(linkTo);
    }

    handleFilter = (searchText) => {
        if (searchText.target.value == "") {
            return this.setState({
                races: this.state.searchApiData,
            });
        } else {
            const filterResult = this.state.searchApiData.filter(
                (races) => races.Circuit.Location.country.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    races.Circuit.circuitName.toLowerCase().includes(searchText.target.value.toLowerCase()) ||
                    races.date.toLowerCase().includes(searchText.target.value.toLowerCase()) || races.Results[0].Driver.familyName.toLowerCase().includes(searchText.target.value.toLowerCase())
            );
            this.setState({
                races: filterResult,
            });
        }
    };

    render() {

        if (this.state.isLoading) {
            return <Loader />
        };

        const breadcrumb = [
            {
                title: "/Races",
                url: "/races"
            }
        ];

        return (
            <div className="raceWraperDiv">
                <Breadcrumb breadcrumb={breadcrumb} />
                <Search filterValue={this.state.filterValue} handleFilter={this.handleFilter} />

                <h1 className="title">Race Calendar</h1>
                <table className="table">
                    <thead>
                        <tr className="tableHeader">
                            <td colSpan={5}>Race calendar - {this.state.selectedSeason}</td>
                        </tr>
                        <tr className="table-header">
                            <th>Round</th>
                            <th>Grand Prix</th>
                            <th>Circuit</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                    </thead>

                    <tbody className="race-table">
                        {this.state.races.map((race, i) => {
                            return (
                                <tr className="grand-prix second" key={i} onClick={() => this.handleClickDetails(race.round)}>
                                    <td className="boldNumbers">{race.round}</td>
                                    <td className="second">
                                        {this.state.flags.map((flag, index) => {
                                            if (race.Circuit.Location.country === flag.en_short_name) {
                                                return (<Flag className="flag" key={index} country={flag.alpha_2_code} />);
                                            } else if (race.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                                                return (<Flag className="flag" key={index} country="GB" />);
                                            } else if (race.Circuit.Location.country === "UAE" && flag.nationality === "Emirati, Emirian, Emiri") {
                                                return (<Flag className="flag" key={index} country="AD" />);
                                            } else if (race.Circuit.Location.country === "USA" && flag.alpha_3_code === "USA") {
                                                return (<Flag className="flag" key={index} country="US" />)
                                            } else if (race.Circuit.Location.country === "Korea" && flag.nationality === "North Korean") {
                                                return (<Flag className="flag" key={index} country="KP" />)
                                            }
                                        })}
                                        {race.raceName}
                                    </td>

                                    <td>{race.Circuit.circuitName}</td>
                                    <td className="boldNumbers">{race.date}</td>
                                    <td className="second">
                                        {this.state.flags.map((flag, index) => {
                                            // console.log("Only for your eyes: ", race.Results[0].Driver.nationality);
                                            if (race.Results[0].Driver.nationality === flag.nationality) {
                                                return (<Flag className="flag" key={index} country={flag.alpha_2_code} />);
                                            } else if (race.Results[0].Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                return (<Flag className="flag" key={index} country="GB" />);
                                            }
                                        })}
                                        {race.Results[0].Driver.familyName}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };
}