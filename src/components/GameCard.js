import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function GameCard(props) {
    let imageURL = "/static/images/cards/" + props.game.id + ".png"
    return (
        <Card sx={{ maxWidth: 345 }} onClick={() => { window.selectedGame = props.game; console.log("DID IT") }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="175"
                    image={imageURL}
                    alt={props.game.title}
                />
                <CardContent>
                    <Typography textAlign="center" variant="h5" component="div">
                        {props.game.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}