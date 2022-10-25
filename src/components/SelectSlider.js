import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { category } from "../data";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Keyboard } from 'swiper';

SwiperCore.use([Keyboard]);

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
        this.handleGenreChange = this.handleGenreChange.bind(this)
        this.filterGames = this.filterGames.bind(this)
        this.state = { Genre: "All", Games: this.props.games }
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

    updateSwiper(value) {
        this.setState({
            swiper: value
        });
    }

    handleGenreChange(event) {
        this.setState({ Genre: "" + event.target.value })

    }

    filterGames(Genre) {
        console.log(Genre)
        this.state.swiper.update()
        return this.props.games.filter((game) => Genre === "All" || game.category === Genre)
    }

    componentDidUpdate(previousProps, previousState) {

        if (previousState.Genre !== this.state.Genre) {
            this.setState({ Games: this.filterGames(this.state.Genre) })

        }
    }

    render() {
        return (
            <>
                <div style={{ position: "absolute", top: "0px", paddingLeft: "20px", paddingTop: "20px" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                        <InputLabel id="demo-select-large">Genre</InputLabel>
                        <Select
                            labelId="demo-select-large"
                            id="demo-select-large"
                            value={this.state.Genre}
                            label="Genre"
                            onChange={(change) => {
                                this.handleGenreChange(change)
                            }}
                        >
                            {category.map((icategory) =>
                                <MenuItem key={icategory} value={icategory}>{icategory}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div >
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
                    <currentGame.Consumer>
                        {({ game, updateGame }) => (
                            <>
                                <Swiper
                                    slidesPerView={5}
                                    preloadImages={true}
                                    observer={true}
                                    watchactiveindex={"true"}
                                    observeParents={true}
                                    speed={600}
                                    spaceBetween={1}
                                    keyboard={true}
                                    centeredSlides={true}
                                    loop={false}
                                    threshold={1}
                                    lazy={true}
                                    onInit={this.updateSwiper}
                                    onSlidesLengthChange={(swiperCore) => {
                                        swiperCore.slideTo(0)
                                        updateGame(this.state.Games[0])
                                    }}
                                    onSlideChange={(swiperCore) => {
                                        const {
                                            activeIndex,
                                            snapIndex,
                                            previousIndex,
                                            realIndex,
                                        } = swiperCore;

                                        updateGame(this.state.Games[realIndex])
                                        console.log({ activeIndex, snapIndex, previousIndex, realIndex });
                                    }}
                                    slideToClickedSlide={true}
                                >
                                    {this.state.Games.map((igame) =>
                                        <SwiperSlide isActive key={igame.id}>
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
                        onUp={() => {
                            this.setState({ Genre: category[((category.indexOf(this.state.Genre) + 1) % category.length)] })
                        }}
                        onDown={() => {
                            let index = category.indexOf(this.state.Genre) - 1
                            if (index < 0) index = category.length - 1
                            this.setState({
                                Genre: category[index]
                            })
                        }}
                    >
                        <div>
                        </div>
                    </Gamepad>

                </div >
            </>
        );
    }
}