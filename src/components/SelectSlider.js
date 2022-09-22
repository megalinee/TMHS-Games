import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import React from "react"
import GameCard from "./GameCard";
import Controller from "./Controller";
import { currentGame } from "../App";

export default class CenterMode extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }
    next() {
        this.slider.slickNext()
    }

    prev() {
        this.slider.slickPrev()
    }

    render() {
        const settings = {
            className: "slider variable-width",
            centerMode: true,
            infinite: true,
            slidesToShow: 5,
            speed: 500,
            focusOnSelect: true,
            adaptiveHeight: true,
            arrows: false
        };
        return (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                <currentGame.Consumer>
                    {({ game, updateGame }) => (
                        <>

                            < Slider ref={slider => (this.slider = slider)} beforeChange={(current, next) => updateGame(this.props.games[next])} {...settings}>
                                {this.props.games.map((igame) =>
                                    <div>
                                        <GameCard key={igame.id} game={igame} selectedGame={game} />
                                    </div>
                                )}
                            </Slider>
                        </>
                    )}
                </currentGame.Consumer>
                <Controller left={this.prev} right={this.next} />
            </div >
        );
    }
}