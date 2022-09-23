import React, { Component } from 'react'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


import { currentGame } from "../App";
import Spacer from './Spacer';
import { motion } from "framer-motion"

export default class InfoDisplay extends Component {

    componentDidMount() {
        console.log("test")
    }

    render() {
        let height = '70vh'
        return (

            <currentGame.Consumer>
                {({ game, updateGame }) => (
                    <div style={{ height: height, transition: 'width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s' }}>
                        <div style={{ zIndex: -2, backgroundImage: `url("/static/images/cards/${game.id}/thumbnail.png")` }} className="bg-blurred-image"></div>
                        <Grid container style={{ zIndex: .5 }}>

                            <Grid item sm={8} alignItems="center" justifyContent="center" style={{ marginTop: "10vh", position: "absolute", top: '0%', left: '0%' }}>
                                <Paper style={{ backgroundColor: `rgba(${game.color},0.9)`, marginLeft: '20px', paddingRight: '20px', marginTop: '10px', display: 'inline-table', lineHeight: '0' }} elevation={3} sm={3}>
                                    <h1 style={{ fontSize: '70px', marginLeft: '20px' }}>{game.title}</h1>
                                </Paper>
                                <Spacer size="2vh"></Spacer>
                                <Paper style={{ backgroundColor: `rgba(${game.color},0.9)`, marginLeft: '20px', paddingRight: '20px', display: 'inline-table' }} elevation={2}>
                                    <p style={{ fontSize: '25px', marginLeft: '20px' }}>{game.description}</p>
                                </Paper>
                                <Spacer size="2vh"></Spacer>
                                <Paper style={{ backgroundColor: `rgba(${game.color},0.9)`, marginLeft: '20px', paddingRight: '20px', display: 'inline-table', lineHeight: '0' }} elevation={2}>
                                    <p style={{ fontSize: '30px', marginLeft: '20px' }}>Created by {game.author}</p>

                                </Paper>
                                <Spacer size="2vh"></Spacer>
                                <motion.div animate={{ opacity: game.category != "Info" ? 1 : 0 }}>
                                    <Button style={{ fontSize: '30px', backgroundColor: `rgba(${game.color},0.9)`, marginLeft: '25vw' }} variant="outlined">Click To Play</Button>
                                </motion.div>
                            </Grid>
                            <Grid item container style={{ marginTop: "2vh", position: "absolute", top: '0%', right: '0%' }} alignItems="center" justifyContent="center" direction="column" sm={4} spacing={0}>
                                <motion.div key={game.id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                                    <Paper style={{ backgroundColor: `rgba(${game.color},0.9)`, paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '5px' }} elevation={3}>
                                        <Grid item>

                                            <img alt="Preview 1" style={{ maxWidth: "45vw", maxHeight: "30vh", borderRadius: '5px' }} src={`/static/images/cards/${game.id}/preview1.png`} />

                                        </Grid>
                                        <Spacer size="2vh"></Spacer>
                                        <Grid item>
                                            <img alt="Preview 2" style={{ maxWidth: "45vw", maxHeight: "30vh", borderRadius: '5px' }} src={`/static/images/cards/${game.id}/preview2.png`} />
                                        </Grid>
                                    </Paper>
                                </motion.div>
                            </Grid>

                        </Grid>

                    </div >
                )
                }
            </currentGame.Consumer>
        )
    }
}
