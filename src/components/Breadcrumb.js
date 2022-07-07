import React from "react";
import { Link } from "react-router-dom";

const breadcrumb = {
    backgroundColor: "white",
    border: "1px solid rgb(0,0,0, .125)",
    borderRadius: "0.37rem"
}

export default class Breadcrumb extends React.Component {
    render() {
        return (
            <nav className="row justify-content-center mt-4">
                <ul className="breadcrumb" style={breadcrumb}>
                    <Link to="/">F1 starting drivers</Link>
                    {
                        this.props.breadcrumb.map((crumb, i) => {

                            //const disabled = isLast(ci) ? "disabled" : "";

                            return (
                                <li
                                    key={i}
                                    className="breadcrumb-item align-items-center"
                                ><Link to={crumb.url}> {crumb.title}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    };
}