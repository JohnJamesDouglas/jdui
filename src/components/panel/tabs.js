import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Tab from './Tab'

class Tabs extends Component {
    static propTypes = {
        children: PropTypes.instanceOf(Array).isRequired,
    }
    constructor(props) {
        super(props)

        this.state = {
            activeTab: this.props.children[0].props.label,
        }
    }
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab })
    }
    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this
        return (
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((child) => {
                        const { label } = child.props
                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}
                            />
                        )
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return undefined
                        return child.props.children
                    })}
                </div>
            </div>
        )
    }
}

export default Tabs

// export default class TabbedPanel extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { activeTab: this.props.activeTab }
//     }
//     onClick(index) {
//         this.setState({ activeTab: index })
//     }
//     render() {
//         // Get the number of children of type <TabbedPanelHeader/> and <TabbedPanelBody/>
//         let numPanelHeader = null
//         let numPanelBody = null

//         // Loop through the children and if the type is <PanelHeader/> increment numPanelHeader
//         React.Children.forEach(this.props.children, function(child, i) {
//             if(child.type.name === "TabbedPanelHeader") { 
//                 numPanelHeader++ 
//             }
//             if(child.type.name === "TabbedPanelBody") { 
//                 numPanelBody++ 
//             }
//         })

//         // Throw an error if the number of headers and panels doesn't match
//         if(numPanelHeader !== numPanelBody) {
//             throw "The number of <TabbedPanelHeaders/> elements is different to the number of <TabbedPanelBody/> elements"
//         }

//         // The new width is equal to the full width (100) / the number of children
//         let newWidth = (100/numPanelHeader)

//         const tabbedPanelHeader = React.Children.map(this.props.children, (child, index) => {
//             // If the child element is a <TabbedPanelHeader/> add it to collection for rendering
//             if(child.type.name === "TabbedPanelHeader") { 
//                 return React.cloneElement(child, {
//                     // Pass "active" class to the element if the current index is equal to the activeTab state (requires the <PanelHeader/> components be first as children)
//                     className: this.state.activeTab === index ? " active" : "",
//                     index: index,
//                     headerWidth: newWidth,
//                     onClick: () => this.onClick(index)
//                 })
//             }
//         })

//         const tabbedPanelBody = React.Children.map(this.props.children, (child, index) => {
//             // If the child element is a <TabbedPanelBody/> add it to collection for rendering
//             if(child.type.name === "TabbedPanelBody") {
//                 return child
//             }
//         })

//         // Search through the <tabbedPanelBody/> components for the one corresponding to the activeTab state value
//         let currentTabbedPanelBody = tabbedPanelBody.map((current, index) => {
//             if(index === this.state.activeTab) {
//                 return current
//             }
//         })

//         return (
//             <div className="tabbed-panel">
//                 <div className="tabbed-panel-header-container" style={{ height: this.props.headerHeight+"%" }}>
//                     {tabbedPanelHeader}
//                 </div>
//                 <div className="tabbed-panel-body-container" style={{ height: 100-this.props.headerHeight+"%" }}>
//                     {currentTabbedPanelBody}
//                 </div>
//             </div>
//         )
//   }
// }

// TabbedPanel.propTypes = {
//     headerHeight: PropTypes.number.isRequired,
//     activeTab: activeTabExists
// }

// function activeTabExists(props, propName, componentName, location) {
//     let headerCount = 0

//     props.children.map(function(child) {
//         if(child.type.name === "TabbedPanelHeader") {
//             headerCount++
//         }
//     })
//     // If the supplied value of activeTab is less than to the number of headers supplied as children (and is greater than or equal to 0)
//     return props[propName] < headerCount && props[propName] >= 0  ? null : new Error(propName + ' in ' + componentName + " must be less than the number of <TabbedPanelHeader/> children and greater than or equal to 0.")
//     //TabbedPanelHeader
//     //
// }