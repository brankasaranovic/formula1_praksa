import React from "react";

export default class DriverDetails extends React.Component{

    state = {
        driverDetails: null,
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    getDriverDetails = async () => {
        console.log(this.props.match.params.id);
        let id = this.props.match.params.id;
        const url = `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json` 
        const response = await fetch(url);
        const driver = await response.json();
        console.log("driver", driver.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
        const driverDetails = driver.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];

        this.setState({
            driverDetails: driverDetails,
        });
    }

    render(){
        if (!this.state.driverDetails) {
            return (<div></div>)
        }
        return(
            <div className="driver-details">
                <div className="driver-personal-details">
                    <table>
                        <tbody>
                            <tr><td colSpan={2}>{this.state.driverDetails.name}</td></tr>
                            <tr><td>Country:</td><td>{this.state.driverDetails.Driver.nationality}</td></tr>
                            <tr><td>Team:</td><td>{this.state.driverDetails.Constructors[0].name}</td></tr>
                            <tr><td>Birth:</td><td>{this.state.driverDetails.Driver.dateOfBirth}</td></tr>
                            <tr><td>Biography:</td><td><a href={this.state.driverDetails.Driver.url}>Wiki</a></td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="driver-race-details">
                    <table>
                        <thead>
                            <tr>
                                <td colSpan={5}>Formula 1 2013 Results</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Round</td>
                                <td>Grand Prix</td>
                                <td>Team</td>
                                <td>Grid</td>
                                <td>Race</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
}