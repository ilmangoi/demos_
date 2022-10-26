import React, { Component, Fragment } from "react";
import { Carousel } from "antd-mobile";
import { Link } from "react-router-dom";
import { HomeSliderItem } from "../style";

class Slider extends Component {
  state = {
    slideIndex: "1-1",
  };

  carouselChange = (from, to) => {
    this.setState({
      slideIndex: `1-${to + 1}`,
    });
  };

  render() {
    return (
      <Fragment>
        <Carousel infinite style={{ height: 176 }} beforeChange={this.carouselChange}>
          {this.props.data.map(({ id, img, title, to = "" }) => (
            <HomeSliderItem key={id}>
              <Link to={to}>
                <img src={img} alt="" />
                <div className="title">{title}</div>
                <div className="index">{this.state.slideIndex}</div>
              </Link>
            </HomeSliderItem>
          ))}
        </Carousel>
      </Fragment>
    );
  }
}

export default Slider;
