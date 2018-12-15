import React, { Component } from "react";
import PropTypes from "prop-types";

import "./tabbedPanelBody.scss";

export default class TabbedPanelBody extends Component {
  render() {
    return (
        <div className={"tabbed-panel-body"}>
            {this.props.children}
        </div>
    );
  }
}

TabbedPanelBody.propTypes = {}