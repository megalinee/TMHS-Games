import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import GamepadIcon from '@mui/icons-material/Gamepad';
import Gamepad from 'react-gamepad'


import { currentGame } from "../Home";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Spacer from './Spacer';
import { motion } from "framer-motion"

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

export default function InfoDisplay() {
    const navigation = useNavigate() // extract navigation prop here 

    return <Display navigation={navigation} /> //pass to your component.

}


class Display extends Component {
    constructor(props) {
        super(props);
        this.state = { buttonClicked: false };
    }

    clickedButton(category) {
        console.log('CLICK', this.button);
        if (category != "Info") {
            this.setState({ buttonClicked: !this.state.buttonClicked })
            this.props.navigation('/play')
        }
    }

    render() {
        let height = '90vh'
        return (
            <div>
                <currentGame.Consumer>
                    {({ game, updateGame }) => {
                        window.selectedGame = game; return (
                            <div style={{ height: height }}>
                                <motion.div layout style={{ height: height, zIndex: -2, backgroundImage: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, .2) ), url("/static/images/cards/${game.id}/thumbnail.png")` }} className="bg-blurred-image" key={game.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                                </motion.div>
                                <Grid container style={{ zIndex: .5, height: '80vh' }}>

                                    <Grid item sm={8} alignItems="center" style={{ textAlign: "center", margin: "auto" }}>
                                        <Paper style={{ maxWidth: '60vw', backgroundColor: `rgba(${game.color},0.7)`, paddingLeft: '20px', paddingRight: '20px', marginTop: '10px', display: 'inline-table', lineHeight: '0' }} elevation={3} sm={3}>
                                            <h1 style={{ fontSize: 'calc(50px + 2vw)' }}>{game.title}</h1>
                                        </Paper>
                                        <Spacer size="2vh"></Spacer>
                                        <Paper style={{ maxWidth: '60vw', backgroundColor: `rgba(${game.color},0.7)`, paddingLeft: '20px', paddingRight: '20px', display: 'inline-table' }} elevation={2}>
                                            <p style={{ fontSize: 'calc(20px + .5vw)' }}>{game.description}</p>
                                        </Paper>
                                        <Spacer size="2vh"></Spacer>
                                        <Paper style={{ maxWidth: '40vw', backgroundColor: `rgba(${game.color},0.7)`, paddingLeft: '20px', paddingRight: '20px', display: 'inline-table' }} elevation={2}>
                                            <p style={{ fontSize: 'calc(10px + .75vw)' }}>Created by {game.author}</p>

                                        </Paper>
                                        <Spacer size="2vh"></Spacer>
                                        <motion.div key={game.id} onClick={() => this.clickedButton(game.category)} transition={spring} animate={{ y: this.state.buttonClicked ? [0, 5, 0] : 0, scale: (this.state.buttonClicked ? [null, .9, 1] : 1), scalex: (this.props.gamepadState ? [null, 1.1, 1] : 1) }}>
                                            {game.category != "Info" ?
                                                <Button component={Link} to="/play" ref={(input) => (this.button = input)} style={{ fontSize: '30px', backgroundColor: `rgba(0,0,0,.8)` }} variant="outlined">
                                                    {this.props.gamepadState ? <div><GamepadIcon /> Press A To Play</div> : 'Click To Play'}
                                                </Button>
                                                : ''}
                                        </motion.div>
                                    </Grid>
                                    <Grid item container style={{ display: "flex", margin: "auto" }} alignItems="center" justifyContent="center" direction="column" sm={4}>
                                        <motion.div key={game.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                                            <Paper style={{ backgroundColor: `rgba(${game.color},0.7)`, paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '5px' }} elevation={3}>
                                                <Grid item>
                                                    <LazyLoadImage style={{ maxWidth: "29vw", maxHeight: "28vh", borderRadius: '5px' }}
                                                        alt={"Preview 1"}
                                                        src={`/static/images/cards/${game.id}/preview1.png`} />
                                                </Grid>
                                                <Spacer size="2vh"></Spacer>
                                                <Grid item>
                                                    <LazyLoadImage style={{ maxWidth: "29vw", maxHeight: "28vh", borderRadius: '5px' }}
                                                        alt={"Preview 2"}
                                                        src={`/static/images/cards/${game.id}/preview2.png`} />
                                                </Grid>
                                            </Paper>
                                        </motion.div>
                                    </Grid>

                                </Grid>
                                <Gamepad onA={() => { this.clickedButton(game.category) }}>
                                    <div>
                                    </div>
                                </Gamepad>
                            </div >
                        )
                    }
                    }
                </currentGame.Consumer>

            </div>
        )
    }
}
