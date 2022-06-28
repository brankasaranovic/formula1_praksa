import React from "react";
import { ClipLoader } from "react-spinners";

export default class Loader extends React.Component {

    render() {
        return (
            <div>
                <ClipLoader />
            </div>
        );
    }
}