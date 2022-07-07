import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from 'react-icons/fa';

export default class Breadcrumb extends React.Component {
    render() {
        return (
            <nav className="breadcrumbs">
                <ul className="breadcrumb">
                    <li className="breadcrumb-elem align-items-center">
                        <Link className="linkOne btn btn-secondary btn-sm" to="/">
                            <FaHome color="white" />
                            <span className="lineOneHome">F1 starting drivers</span>
                        </Link>
                    </li>
                    {
                        this.props.breadcrumb.map((crumb, i) => {
                            return (
                                <li key={i} className="breadcrumb-elem align-items-center">
                                    <Link className="linkOne btn btn-secondary btn-sm" to={crumb.url}> {crumb.title}</Link>
                                </li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    };
}