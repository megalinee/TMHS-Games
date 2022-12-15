import * as React from 'react';
import { motion } from "framer-motion"

export default function GameInterface(props) {
    let link = window.selectedGame != null ? `https://www.greenfoot.org/scenarios/${window.selectedGame.id}?embed=true` : window.location.replace("/")
    return (
        <div style={{ backgroundColor: "black", width: "100vw", margin: -8, height: "100vh" }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 1 } }}
                exit={{ opacity: 0 }}
                className=''
                style={{ backgroundColor: "black", margin: -8, overflow: "hidden", width: "100vw", height: "100vh" }}>
                <center><iframe style={{ width: "1280px", height: "990px", border: "none" }} src={link}></iframe></center>
            </motion.div>
        </div>
    );
}