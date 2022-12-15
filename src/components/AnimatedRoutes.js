import React from 'react'
import { useLocation, Routes, Route } from "react-router-dom";
import Home from '../Home';
import GameInterface from '../games/GameInterface';

import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route index element={<Home />} />
                <Route path="play" element={<GameInterface />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes