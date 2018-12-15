import React, { Component } from "react";
import PropTypes from "prop-types";

import "./radio.scss";

export default class Radio extends Component {
    render() {
        return (
            <div className="radio">
                <input className="radio-input" type="radio" onChange={this.props.onClick} checked={this.props.checked}/>
                <label className="radio-label">{this.props.children}</label>
            </div>
        );
    }
}

Radio.propTypes = {}