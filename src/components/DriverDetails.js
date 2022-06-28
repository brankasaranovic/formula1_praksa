import React from "react";
import history from "./../history";

export default class DriverDetails extends React.Component{


  state ={
    driverDetails: {}
  }



  componentDidMount() {
    this.getDriverDetails();
  }


  getDriverDetails = async () =>{
    console.log(this.props.match.params.id);
    const id = this.props.match.params.id
    const url = "https://jsonplaceholder.typicode.com/comments/";
    const response = await fetch(url);
    const details = await response.json();
    console.log("details", details);
    this.setState({
        driverDetails: details,
        isLoading: false
    })
  }


    render(){
        return(
          <div>
            <h3>Driver details</h3>
          </div>
        );
    };
}