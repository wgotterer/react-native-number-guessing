import React, {useState, useRef, useEffect} from 'react'
import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
// below import allows us to import various icon components from this package
import { Ionicons} from '@expo/vector-icons'


// we include an exclude parameter to make sure the device doesn't guess the users number on the first try
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const rndNum = Math.floor(Math.random() * (max-min)) + min
    if (rndNum === exclude){
        // Here we are using recursing, the act of calling a function within a function
        // we are calling the generaterandombetween function again if the rndNum euqals the excluded number
        return generateRandomBetween(min, max, exclude)
    }else{
        return rndNum
    }

}


 const GameScreen = (props) => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    // We use the useRef hook becuase these varbiables are not regenerated when the component rerenders and allows us to 
    // store a new highest number and new lowest number.
    // the variables are store detached from the component once they are initialized
    const currentLow =useRef(1);
    const currentHigh = useRef(100)
    const [pastGuesses, setPastGuesses] = useState([initialGuess])

    const { userChoice, onGameOver} = props;
    // destruction the props becuase we want to use them in
    // the dependency array in the useEffect
    // and to pass props.userChoixe would change every time the parent component changes
    // which we dont want to do. 

    useEffect(() => {
        if(currentGuess === userChoice){
            // to get number of rounds to display we need to pass the number of 
            // guesses array's length
            onGameOver(pastGuesses.length)
        }
        
    }, [currentGuess, userChoice, onGameOver ])

    const nextGuessHandler = direction => {

        if (
            (direction === "lower" && currentGuess < props.userChoice) || 
            (direction === "greater" && currentGuess > props.userChoice)
            ){
                Alert.alert("Don't lie!", "You know that this is wrong...", [
                    { text: "Sorry", style: "cancel"}
                ])
            return
        }
        if(direction === "lower"){
            // useRef is an object that we can call methods on. We are using the 
            // current property method that allows us to store the actual value
            // if I am telling you (the computer) that if I press the lower button
            // That number is now registered as the new highest value to search between. 
            currentHigh.current = currentGuess
        }else{
            // I am adding plus one becuase in order to have a unique key when mapping below
            // without the  + 1 it would be possible for two keys to be the same
            // becuase the upper boundery is excluded but the lower boundery is included
            currentLow.current = currentGuess + 1
        }
       const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)

       setCurrentGuess(nextNumber)
    //    using the setState arrow function to take th current state and
    // manipulate it
    
        // This takes the current state of pastGuesses and adds the nextNumber thats guessed to the array
        setPastGuesses(curPastGuesses => [nextNumber ,...curPastGuesses])

    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuesses.map(guess => 
                    <View key={guess}>
                         <Text>{guess}</Text>
                    </View>)}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    screen: {
        // flex 1 takes all avaible space on the screen below the header
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        // width at 80 so it can exceed the size of the parent View
        maxWidth: "90%"
    }
       
    })

export default GameScreen
