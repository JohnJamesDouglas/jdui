import React, { Component } from "react";
import PropTypes from "prop-types";

import Checkbox from "./checkbox";
import Radio from "./radio";

import "./optionGroup.scss";

export default class OptionGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { checked: Array(React.Children.count(props.children)).fill(false) }
        //this.state = { checked: this.props.checked }
    }
    onClick(index, type) {
        const { checked } = this.state
        const { callback } = this.props
        // If the chosen inputs are radio buttons - fill the array with false to prevent multiple options being selected
        type === "Radio" ? checked.fill(false) : null
        // Call the update method as a callback to pass the stat back up to the parent
        this.setState({ checked: checked[index] = !checked[index] }, callback())
    }
    render() {
        return (
            <div className={"optionGroup option-"+this.props.align}>
                {
                    React.Children.map(this.props.children, (child, index) => {
                        if(child.type.name === "Checkbox" || "Radio") {
                            return React.cloneElement(child, {
                                index: index,
                                onClick: () => this.onClick(index, child.type.name),
                                checked: this.state.checked[index]
                            })
                        }
                    })
                }
            </div>
        )
    }
}

let pACC = createChainableTypeChecker(propsArrayChildChecker)
let aROC = createChainableTypeChecker(alignRowOrColumnChecker)

OptionGroup.propTypes = {
    checked: pACC,
    align: aROC
}

function alignRowOrColumnChecker(props, propName, componentName, location) {
    return props[propName] === "column" || props[propName] === "row" ? null : new Error(propName + ' in ' + componentName + " must be a string of value 'column' or 'row'.")
}

// Function which check the number of children is equal to the number of elements in an array prop
function propsArrayChildChecker(props, propName, componentName, location) {
    componentName = componentName || 'ANONYMOUS';
  
    if(props[propName]) {
        // If the number of elements in the supplied array is equal to the number of children - return null - otherwise throw error
        return props[propName].length === props.children.length ? null : new Error(propName + ' in ' + componentName + " has more children than the prop 'checked' has array elements.")
    }
    // assume all ok
    return null;
}
  
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
      componentName = componentName || ANONYMOUS;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error(
            ("Required " + locationName + " `" + propName + "` was not specified in ") +
            ("`" + componentName + "`.")
          );
        }
        return null;
      } else {
        return validate(props, propName, componentName, location);
      }
    }
  
    let chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
  
    return chainedCheckType;
}
  