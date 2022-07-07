import React from "react";

export default class SearchBar extends React.Component {
    state = {
        query: null,
        list: [],
        filteredItems: []
    }

    componentDidMount() {
        this.getProp();
    }

    getProp = async () => {
        const listOfElem = this.props.searchProp;
        console.log("SEARCH", listOfElem);

        const list = [];
        if (listOfElem[0].Constructor) {
            listOfElem.map(li => {
                list.push(li.Constructor.name);
            })
        } else {
            listOfElem.map(li => {
                list.push(li.raceName);
            })
        };

        // console.log("LISTA", list);
        this.setState({
            list: list
        })
    }

    handleChange = (e) => {
        const tempQuery = e.target.value.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
        const tempQ = e.target.value;

        const filteredItems = this.state.list.filter(data => data.includes(tempQuery));
        // console.log("FILTRIRANO", filteredItems);

        if (!tempQuery) {
            // console.log("SADA");
            filteredItems.splice(0, filteredItems.length);
        }

        this.setState({
            query: tempQuery,
            filteredItems: filteredItems
        })
    }

    render() {
        return (
            <div>
                <label>Search</label>
                <input type="text" onChange={e => this.handleChange(e)} />
                <ul>
                    {this.state.filteredItems.map(val => <li key={val}>{val}</li>)}
                </ul>
            </div>
        )
    }
}