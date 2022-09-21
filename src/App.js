import './App.css';
import React from 'react';
import SelectSlider from './components/SelectSlider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { games } from "./data";
import CssBaseline from '@mui/material/CssBaseline';
import Spacer from './components/Spacer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const currentGame = React.createContext({
  game: games[0],
  updateGame: () => { }
})

function App() {
  const [gameState, updateGameState] = React.useState(games[0]);
  const value = { game: gameState, updateGame: updateGameState };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <currentGame.Provider value={value}>
          <Box sx={{ bgcolor: '#cfe8fc', height: '67vh', width: '100vw' }} />
          <Spacer size="2vh"></Spacer>
          <SelectSlider games={games}></SelectSlider>
        </currentGame.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
