import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default class Loader extends React.Component {

    render() {
        return (
            <div>
                <ClipLoader size={50} color="red" />
            </div>
        );
    };
}