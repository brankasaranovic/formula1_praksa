import React from "react";
import history from "../history";
import Loader from "./Loader"

export default class Races extends React.Component {

    state = {
        races: []
        //isLoading: true
    }

    componentDidMount() {
        this.getRaces();
    }

    getRaces = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await fetch(url);
        const races = await response.json();
        console.log("races", races.MRData.RaceTable.Races);
        this.setState({
            races: races.MRData.RaceTable.Races
            //isLoading: false
        });
    }

    /*handleClickDetails = (id) => {
        console.log("id", id);
        const linkTo = "/details/" + id;
        history.push(linkTo);
    }*/

    render() {
        if (this.state.isLoading) {
            return <Loader />
        };
        
    
        return (
            <div>
              <h2>Race calendar</h2>
      
              <>
                <table>
      
                  <thead>
                    <tr>
                      <th>Round</th>
                      <th>Grand Prix</th>
                      <th>Circuit</th>
                      <th>Date</th>
                      <th>Winner</th>
                    </tr>
                  </thead>
      
                  <tbody>
                  {this.state.races.map((race, i) => {
                      return (
                        <tr key={i}>
                          <td>{race.round}</td>
                          <td>{race.raceName}</td>
                          <td>{race.Circuit.circuitName}</td>
                          <td>{race.date}</td>
                          <td>{race.Results[0].Driver.driverId}</td>
                        </tr>
                      );
                    })}
                  </tbody>
      
                </table>
              </>
            </div>
          );
        }
      
      }
