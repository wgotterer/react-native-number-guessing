import StartGameScreen from './screens/StartGameScreen';
import { StyleSheet, View } from 'react-native';
import Head from './components/Head';

export default function App() {
  return (
    <View style={styles.screen}>
      <Head titles={"Guess a Number"}/>
      <StartGameScreen />
  
    </View>
  );
}

const styles = StyleSheet.create({

  screen: {
    flex: 1
  }
  
});
