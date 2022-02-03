import StartGameScreen from './screens/StartGameScreen';
import React, {useState} from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Head from './components/Head';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font'
// AppLoading prolongs the default loading screen users see
// and stays active until a certain task is done loading
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
  // we return what's inside of fetchFonts because we want to wait until this
  // promise is resolved before we continue 
  // loadAsync takes a more time to resolve the promise
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}


export default function App() {

  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)


  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //      //   // AppLoading component is rendered becuase I don't want anything else to be rendered if we are still loading data
  // //   // the startAsync prop is what we want to happen when component is first rendered  
  // //   // startAsync has to be a function and has to have a promise becuase Expo automitically listens for the promise
  // //   // and when the loading is down it will call the onFinish prop function 
  //       startAsync={fetchFonts}
  //       onFinish={() => setDataLoaded(true)}
  //       onError={(err) => console.log(err)}
  //     />
  //   );
  // }

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)

  }

  const gameOverHandler  = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  const handleStartGame = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }

  let content = <StartGameScreen handleStartGame={handleStartGame} />

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if(guessRounds > 0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>
  }
  return (
    <View style={styles.screen}>
      <Head titles={"How Many Cookies In The Cookie Jar?"}/>
      {content}
      
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1,
  
  }
  
});
