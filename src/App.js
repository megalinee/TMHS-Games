import './App.css';
import React from 'react';
import SelectSlider from './components/SelectSlider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { games } from "./data";
import CssBaseline from '@mui/material/CssBaseline';
import Spacer from './components/Spacer';
import InfoDisplay from './components/InfoDisplay';

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
          <InfoDisplay />
          <Spacer size="2vh"></Spacer>
          <SelectSlider games={games}></SelectSlider>
        </currentGame.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
