import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from "framer-motion"
import { CardActionArea } from '@mui/material';

export default function GameCard(props) {
    let imageURL = `/static/images/cards/${props.game.id}/${props.game.id}.png`
    let isSelected = props.selectedGame.id === props.game.id
    return (
        <motion.div animate={{ scale: isSelected ? 1 : .9 }}>
            <Card sx={{ maxWidth: 345 }} style={{ outline: isSelected ? '3px solid white' : '0px' }} onClick={() => { window.selectedGame = props.game; console.log("DID IT") }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="175"
                        image={imageURL}
                        alt={props.game.title}
                    />
                    <CardContent>
                        <Typography textAlign="center" variant="h5">
                            {props.game.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card >
        </motion.div>
    );
}