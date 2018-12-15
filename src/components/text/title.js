import React, { Component } from "react";
import PropTypes from "prop-types";

import "./title.scss";

export default class Title extends Component {
    render() {
        let style = { textAlign: this.props.align }
        let x = null
        if(this.props.type === 1) {
            x = <h1 className="title" style={style}>{this.props.children}</h1>
        } else if(this.props.type === 2) {
            x = <h2 className="title" style={style}>{this.props.children}</h2>
        } else if(this.props.type === 3) {
            x = <h3 className="title" style={style}>{this.props.children}</h3>
        } else if(this.props.type === 4) {
            x = <h4 className="title" style={style}>{this.props.children}</h4>
        } else if(this.props.type === 5) {
            x = <h5 className="title" style={style}>{this.props.children}</h5>
        } else if(this.props.type === 6) {
            x = <h6 className="title" style={style}>{this.props.children}</h6>
        }
        
        return (
            x
        )
    }
}

Title.propTypes = {
    type: PropTypes.number.isRequired,
    align: PropTypes.string.isRequired
}