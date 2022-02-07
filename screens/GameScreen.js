import React, {useState, useRef, useEffect} from 'react'
import {View, StyleSheet, Text, Alert, ScrollView, Dimensions, FlatList, Image} from 'react-native'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import MainButton from '../components/MainButton'
// below import allows us to import various icon components from this package
import { Ionicons} from '@expo/vector-icons'
import BodyText from '../components/BodyText'


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

// created renderListItem variable to clean up the mapping of the guessed numbers in the return
 const renderListItem = (listLength, itemData) => 
    (<View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>    
    <BodyText>{itemData.item}</BodyText>
    </View>)

 const GameScreen = (props) => {

    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    // We use the useRef hook becuase these varbiables are not regenerated when the component rerenders and allows us to 
    // store a new highest number and new lowest number.
    // the variables are store detached from the component once they are initialized
    const currentLow =useRef(1);
    const currentHigh = useRef(100)
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get("window").width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get("window").height)

    // us toString because the key in FlatList can't be a number
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

    const { userChoice, onGameOver} = props;
    // destruction the props becuase we want to use them in
    // the dependency array in the useEffect
    // and to pass props.userChoixe would change every time the parent component changes
    // which we dont want to do. 

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get("window").width)
            setAvailableDeviceWidth(Dimensions.get("window").height)
        }
        Dimensions.addEventListener("change", updateLayout)
        return () => {
            Dimensions.removeEventListener("change", updateLayout)
        }
    }, [])

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
        setPastGuesses(curPastGuesses => [nextNumber.toString() ,...curPastGuesses])

    }

    let listContainerStyle = styles.listContainer;

    if (availableDeviceWidth < 350){
        listContainerStyle = styles.listContainerBig
    }

    // have this if to check if phone layout is horizontal/small and render buttons differently
    if (availableDeviceHeight > 500){
        return(<View style={styles.screen}>
            <View style={styles.cookiePicContainer}>
                <Image fadeDuration={1000} source={require('../assets/cookiejar.jpeg')} style={styles.cookiePic} resizeMode="cover"/>
            </View>
            <Text>Opponent's Guess</Text>
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                {/* <Card style={styles.buttonContainer}> */}
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            {/* </Card> */}
            {/* Wrapped in a view to control the width and height of the boxes
            If I were to try to style the listItems or ScrollView I wouldnt get
            the desire result */}
            <View style={listContainerStyle}>
                {/* ScrollView nested inside a view works on iOS but not 
                on Android. Added flex: 1 to allow android to scroll  */}

                {/* to style content inside ScrollView we can use normal style
                but it wont let you do as much styling. Instead use contenContainerStyle*/}

                {/* <ScrollView contentContainerStyle={styles.list}> */}
                    {/* add index as a second arg to display the round number. Get this by subtracting the length of 
                    pastGuesses array to the index. This works becuase each time a new guess is added to the beginning 
                    of the array.   */}
                    {/* {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}

                {/* FlatList is a good alternative to ScrollView if not sure how many items will be displayed
                it takes a prop data which is what you are feeding into the FlatList
                it takes a renderItem prop that outputs the components for every item
                use KeyExtractor prop to override the default. we need a key but have an array of numbers
                not an array with objects 
                FlatList also want a key that's a string, not a number */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.list}
                 />


            </View>
        </View>)
    }
        return(<View style={styles.screen}>
            <View style={styles.cookiePicContainer}>
                <Image fadeDuration={1000} source={require('../assets/cookiejar.jpeg')} style={styles.cookiePic} resizeMode="cover"/>
            </View>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{...styles.buttonContainer, marginTop: availableDeviceHeight > 600 ? 20 : 5}}>
            {/* <Card style={[...styles.buttonContainer, {marginTop: availableDeviceHeight > 600 ? 20 : 5}]}> */}
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
           
            </Card>
            {/* Wrapped in a view to control the width and height of the boxes
            If I were to try to style the listItems or ScrollView I wouldnt get
            the desire result */}
            <View style={listContainerStyle}>
                {/* ScrollView nested inside a view works on iOS but not 
                on Android. Added flex: 1 to allow android to scroll  */}

                {/* to style content inside ScrollView we can use normal style
                but it wont let you do as much styling. Instead use contenContainerStyle*/}

                {/* <ScrollView contentContainerStyle={styles.list}> */}
                    {/* add index as a second arg to display the round number. Get this by subtracting the length of 
                    pastGuesses array to the index. This works becuase each time a new guess is added to the beginning 
                    of the array.   */}
                    {/* {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}

                {/* FlatList is a good alternative to ScrollView if not sure how many items will be displayed
                it takes a prop data which is what you are feeding into the FlatList
                it takes a renderItem prop that outputs the components for every item
                use KeyExtractor prop to override the default. we need a key but have an array of numbers
                not an array with objects 
                FlatList also want a key that's a string, not a number */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.list}
                 />


            </View>
        </View>)
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
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
        // marginTop: Dimensions.get("window").height > 600 ? 20 : 5,
        width: 400,
        // width at 80 so it can exceed the size of the parent View
        maxWidth: "90%"
    },
    controls:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%"
    },

    listContainer: {
        // width: "80%",
        // added flex one to View container for scrolling
        flex: 1,
        width: "50%"
    },
    listContainerBig:{
        flex: 1,
        width: "80%"

    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    
    },
    list: {
        // flexGrow takes up as much space as it can, similar to flex but flexGrow is more flexible
        // flexGrow allows the component to keep the other behavior it has such as scrolling on ScrollView
        flexGrow: 1,
        // scrollview has default flexbox so can use alignItems to control the cross axis
        // alignItems: "center",
        // justifyContent allows us to position content along the main axis of flexbox, which by default is column
        justifyContent: "flex-end"
    },
    
    cookiePicContainer:{
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get("window").width > 350 ? 150 : 50,
        height: Dimensions.get("window").height > 600 ? 150 : 50,
        // any child inside of the container that would go out of the container is cut off with overflow
        overflow: "hidden",
        marginVertical: 5
    },
    cookiePic:{
        width: "100%",
         height: "100%",

    },
    
       
    })

export default GameScreen
