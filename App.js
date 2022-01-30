import StartGameScreen from './screens/StartGameScreen';
import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Head from './components/Head';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)

  const gameOverHandler  = numOfRounds => {
    setGuessRounds(numOfRounds)
    setGuessRounds(0)
  }

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  let content = <StartGameScreen handleStartGame={handleStartGame} />

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if(guessRounds > 0){
    content = <GameOverScreen />
  }
  return (
    <View style={styles.screen}>
      <Head titles={"Guess a Number"}/>
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1
  }
  
});
