import React, { Component } from "react";
import PropTypes from "prop-types";

import "./parallax.scss";
import Button from "../input/button";
import Row from "../layout/row";
import Col from "../layout/column";

export default class Parallax extends Component {
    constructor() {
        super()
        this.state = { backgroundImage: null }
    }
    test() {
        console.log("test!")
        this.setState({ backgroundImage: `url(${this.props.background})` })
    }
    render() {    
        return (
            // <div className="parallax" style={{ minHeight: this.props.height+"%", backgroundImage: `url(${this.props.background})` }}>
            <div className="parallax" style={{ minHeight: this.props.height+"%"}}>
                {/* <div className="parallax-effect" style={{ backgroundImage: this.state.backgroundImage }}/> */}
                <Button height={10} onClick={this.test.bind(this)}>TEST</Button>
                {/* { this.props.children} */}
            </div>
        );
    }
}

Parallax.propTypes = {
    height: PropTypes.number.isRequired,
    background: PropTypes.string.isRequired
}