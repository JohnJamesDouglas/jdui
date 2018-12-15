import React, { Component } from "react";
import PropTypes from "prop-types";

import "./tabbedPanelHeader.scss";

export default class TabbedPanelHeader extends Component {
  render() {
    let className = this.props.className !== undefined ? this.props.className : "" 
    return (
        <div className={"tabbed-panel-header"+className} style={{ width: this.props.headerWidth+"%", height: this.props.headerHeight+"%" }} onClick={this.props.onClick}>
            <div>{this.props.children}</div>
        </div>
    );
  }
}

TabbedPanelHeader.propTypes = {
    headerWidth: PropTypes.number,
    headerHeight: PropTypes.number
}