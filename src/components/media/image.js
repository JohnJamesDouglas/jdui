import React, { Component } from "react";
import PropTypes from "prop-types";

import "./image.scss";

export default class Image extends Component {
    render() {
        return (
            <img className="image" src={this.props.src} alt={this.props.alt}/>
        );
    }
  }

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}