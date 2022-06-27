import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Races extends React.Component {

    state = {
        races: {},
        //isLoading: true
    }

    componentDidMount() {
        this.getRaces();
    }

    getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await fetch(url);
        const races = await response.json();
        console.log("races", races);
        this.setState({
            races: races,
            //isLoading: false
        });
    }

    /*handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/details/" + id;
        history.push(linkTo);
    }*/

    render() {
        if(this.state.isLoading) {
            return <Loader />
        };

        return (
            <div>
                <h2>Races</h2>
                {this.state.races.map((race, i) => {
                    return (
                        <div>
                            key={i}
                        
                        </div>
                    );
                })}
            </div>
        );
    }
}