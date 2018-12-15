import React, { Component } from "react";
import PropTypes from "prop-types";

import "./svg.scss";

export default class Svg extends Component {
    render() {
        return (
            <svg className="image" src={this.props.src} alt={this.props.alt}/>
        );
    }
  }

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}