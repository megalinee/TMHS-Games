import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { categories } from "../data";

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
                <div style={{ position: "absolute", bottom: "28vh", paddingLeft: "20px", paddingTop: "20px" }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="large">
                        <InputLabel style={{ fontSize: '18px', color: "white" }} id="demo-select-large">Genre</InputLabel>
                        <Select style={{ fontSize: '20px', backgroundColor: `rgba(0,0,0,.5)`, outlineWidth: '10px' }}
                            labelId="demo-select-large"
                            id="demo-select-large"
                            value={this.state.Genre}
                            label="Genre"
                            onChange={(change) => {
                                this.handleGenreChange(change)
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
                            this.setState({ Genre: categories[((categories.indexOf(this.state.Genre) + 1) % categories.length)] })
                        }}
                        onDown={() => {
                            let index = categories.indexOf(this.state.Genre) - 1
                            if (index < 0) index = categories.length - 1
                            this.setState({
                                Genre: categories[index]
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