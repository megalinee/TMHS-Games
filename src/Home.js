import './App.css';
import React from 'react';
import SelectSlider from './components/SelectSlider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { games } from "./data";
import CssBaseline from '@mui/material/CssBaseline';
import Spacer from './components/Spacer';
import InfoDisplay from './components/InfoDisplay';
import Gamepad from 'react-gamepad'
import { motion } from "framer-motion"

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#020021',
    }
  }
});

export const currentGame = React.createContext({
  game: games[0],
  updateGame: () => { }
})

function App() {
  const [gameState, updateGameState] = React.useState(games[0]);
  const [gamepadState, updateGamepadState] = React.useState(false);
  const value = { game: gameState, updateGame: updateGameState };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <currentGame.Provider value={value}>
          <InfoDisplay gamepadState={gamepadState} />
          <Spacer size="2vh"></Spacer>
          <SelectSlider games={games}></SelectSlider>
        </currentGame.Provider>
      </ThemeProvider>
      <Gamepad
        onConnect={() => { updateGamepadState(true) }}
        onDisconnect={() => { updateGamepadState(false) }}
      >
        <div>
        </div>
      </Gamepad>
    </motion.div>
  );
}

export default App;
