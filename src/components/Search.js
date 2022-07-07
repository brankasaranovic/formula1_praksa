import React from "react";

export default class Search extends React.Component {
    render() {
        return (
            <input
                placeholder="Search"
                defaultValue={this.props.filterValue}
                onChange={(e) => this.props.handleFilter(e)}
            ></input>
        );
    }
}