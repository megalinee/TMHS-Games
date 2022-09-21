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
            infinite: true,
            slidesToShow: 5,
            speed: 500,
            focusOnSelect: true,
            variableWidth: true,
            arrows: false
        };
        return (
            <div>
                <currentGame.Consumer>
                    {({ game, updateGame }) => (
                        <>
                            {game.title}

                            < Slider ref={slider => (this.slider = slider)} beforeChange={(current, next) => updateGame(this.props.games[next])} {...settings}>
                                {this.props.games.map((game) =>
                                    <div>
                                        <GameCard key={game.id} game={game} onClick={() => { window.selectedGame = game }} />
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