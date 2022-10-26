import { categories } from "../data";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';

SwiperCore.use([Keyboard]);

import 'swiper/css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React from "react"
import GameCard from "./GameCard";
import Gamepad from 'react-gamepad'
import { currentGame } from "../App";

export default class CenterMode extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.goto = this.goto.bind(this);
        this.updateSwiper = this.updateSwiper.bind(this);
        this.setGenre = this.setGenre.bind(this)
        this.filterGames = this.filterGames.bind(this)
        this.state = { Genre: "All", Games: this.props.games, updateGame: null }
    }

    next() {
        this.state.swiper.slideNext()
    }

    prev() {
        this.state.swiper.slidePrev()
    }

    goto(index) {
        this.state.swiper.slideTo(index)
    }

    setGenre(genre) {
        this.setState({ Genre: "" + genre })
        if (this.state.updateGame !== null) {
            this.goto(0)
            this.state.updateGame(this.filterGames(genre)[0])
        }
    }

    nextGenre() {
        this.setGenre(categories[((categories.indexOf(this.state.Genre) + 1) % categories.length)])
    }

    prevGenre() {
        let index = categories.indexOf(this.state.Genre) - 1
        if (index < 0) index = categories.length - 1
        this.setGenre(categories[index])
    }

    updateSwiper(value, updateGame) {
        this.setState({
            swiper: value,
            updateGame: updateGame
        });
    }

    filterGames(Genre) {
        return this.props.games.filter((game) => Genre === "All" || game.category.split(", ").includes(Genre))
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousState.Genre !== this.state.Genre) {
            this.setState({ Games: this.filterGames(this.state.Genre) })
        }
    }

    render() {
        return (
            <>
                <div style={{ position: "absolute", bottom: "28vh", paddingLeft: "20px", paddingTop: "20px" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                        <InputLabel style={{ fontSize: '18px', color: "white" }} id="demo-select-large">Genre</InputLabel>
                        <Select style={{ fontSize: '20px', backgroundColor: `rgba(0,0,0,.5)`, outlineWidth: '10px' }}
                            labelId="demo-select-large"
                            id="demo-select-large"
                            value={this.state.Genre}
                            label="Genre"
                            onChange={(change) => {
                                this.handleGenreChange(change.target.value)
                            }}
                        >
                            {categories.map((category) =>
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div >
                <div style={{ position: "absolute", bottom: "5px", left: "0px", right: 0 }}>
                    <currentGame.Consumer>
                        {({ game, updateGame }) => (
                            <>
                                <Swiper
                                    slidesPerView={5}
                                    preloadImages={true}
                                    speed={600}
                                    spaceBetween={1}
                                    keyboard={true}
                                    centeredSlides={true}
                                    loop={false}
                                    threshold={1}
                                    lazy={true}
                                    onInit={(swiper) => {
                                        this.updateSwiper(swiper, updateGame)
                                    }}
                                    onSlideChange={(swiperCore) => {
                                        const {
                                            realIndex
                                        } = swiperCore;

                                        updateGame(this.state.Games[realIndex])
                                    }}
                                    slideToClickedSlide={true}
                                >
                                    {this.state.Games.map((igame) =>
                                        <SwiperSlide key={igame.id}>
                                            <GameCard game={igame} selectedGame={game} />
                                        </SwiperSlide>
                                    )}

                                </Swiper>
                            </>
                        )}
                    </currentGame.Consumer>
                    <Gamepad
                        onLeft={() => { this.prev() }}
                        onRight={() => { this.next() }}
                        onUp={() => { this.nextGenre() }}
                        onDown={() => { this.prevGenre() }}
                    >
                        <div>
                        </div>
                    </Gamepad>

                </div >
            </>
        );
    }
}