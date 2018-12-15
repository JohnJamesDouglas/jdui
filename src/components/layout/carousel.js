import React, { Component } from "react";
import PropTypes from "prop-types";

import "./carousel.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Image from "../media/image";
import Container from "./container"

export default class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = { activeImg: 0, numberImgs: props.children.length, seconds: 0, changeSeconds: this.props.changeSeconds, interval: null }
  }
  changeImg(direction) {
    let current = this.state.activeImg
    if (direction === 0) {
      if ((current - 1) >= 0) { current-- }
    } else {
      if ((current + 1) < this.state.numberImgs) { current++ }
    }
    // Update the current img and reset the change timer
    this.setState({ activeImg: current, seconds: 0 })
  }
  changeImagePill(index) {
    // Update the current img and reset the change timer
    this.setState({ activeImg: index, seconds: 0 })
  }
  changeImgTimer() {
    let current = this.state.activeImg
    if ((current + 1) < this.state.numberImgs) {
      current++
    } else {
      current = 0
    }
    // Update the current img and reset the change timer
    this.setState({ activeImg: current, seconds: 0 })
  }
  tick() {
    // If the time + 1 !== the number of seconds chosen to change the img then increment the count otherwise reset it
    this.setState(prevState => ({ seconds: prevState.seconds + 1 }), () => { this.state.seconds > this.state.changeSeconds ? this.setState({ seconds: 0 }, this.changeImgTimer()) : null })// this.changeImgTick())
  }
  componentDidMount() {
    // Initiate the timer if the changeSeconds value is greater than or equal than 0 
    this.state.changeSeconds >= 0 ? this.setState({ interval: setInterval(() => this.tick(), 1000) }) : null
    //clearInterval(this.state.interval)
  }
  componentWillUnmount() {
    clearInterval(this.state.interval)
  }
  render() {
    let carouselChildren = React.Children.map(this.props.children, (child, index) => {
      if (index === this.state.activeImg) {
        return child
      }
    })
    let carouselPills = React.Children.map(this.props.children, (child, index) => {
      return <div key={index} className={index === this.state.activeImg ? "carousel-pill active" : "carousel-pill"} style={{ width: 100 / this.state.numberImgs + "%" }} onClick={() => this.changeImagePill(index)} />
    })
    return (
      <div className="carousel">
        <div className="carousel-img-container">
          {carouselChildren}
        </div>
        <div className="carousel-mover chevron-left" onClick={() => this.changeImg(0)}><FontAwesomeIcon icon={faChevronLeft} size={"5x"} /></div>
        <div className="carousel-mover chevron-right" onClick={() => this.changeImg(1)}><FontAwesomeIcon icon={faChevronRight} size={"5x"} /></div>
        {
          this.props.pills === true ?
            <div className="carousel-pill-container">
              {carouselPills}
            </div>
            : null
        }
      </div>
    );
  }
}

Carousel.propTypes = {
  pills: PropTypes.bool.isRequired,
  changeSeconds: PropTypes.number.isRequired
}