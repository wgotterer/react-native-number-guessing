import React, {useState, useEffect} from 'react'
import Card from '../components/Card'
import {View, StyleSheet, Text, Button, TouchableWithoutFeedback, ScrollView, Dimensions, Keyboard, KeyboardAvoidingView, Image, Alert} from 'react-native'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNum, setSelectedNum] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)


  

    const numberInputHandler = inputText => {
        // setting state/value of Input component to whatever
        // is being typed in but using the replace method and a regular expression
        // saying to replace anything that is not a number globally ( globally = the entire text
        // not just the first thing entered) with an empty string
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const handleResetInput = () => {
        setEnteredValue( "")
        setConfirmed(false)
    }

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4)
        }

        Dimensions.addEventListener('change', updateLayout)
        return () => {
            Dimensions.removeEventListener("change", updateLayout)
        }
    }, [])

    const handleConfirmInput = () => {
        const choseNum = parseInt(enteredValue)
        // use the isNan() function instead of the equality check (choseNum === NaN)
        if(isNaN(choseNum) || choseNum <= 0 || choseNum > 99){
            // we return to break the function and not continue becuase
            // the number is invalid 
            // an alert is also shown
            Alert.alert("Invalid Number", "Number has to be a number between 1 and 99.", 
                [{text: "Okay", stlye: "destructive", onPress: handleResetInput}])
            return
        }
        setConfirmed(true)
        setEnteredValue("")
        setSelectedNum(parseInt(enteredValue))
        Keyboard.dismiss("r")

    }

    let confirmedOutput
    // if we have a defined conformedOutput due to confirmed being truthy(happens in handleConfirmInput)
    // we return a component visually telling the user what number was chosen
    if(confirmed){
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNum}</NumberContainer>
        <MainButton title="START GAME" onPress={() => props.handleStartGame(selectedNum)}>
            START GAME
        </MainButton>
        </Card>
        
    }

    return (
       
            // Touchable components allows to to touch listerner without giving visual feedback
            // the keyboard api allows us to interact with the native device
            <ScrollView>
                {/* KeyboardAvoidView wraps around components to make sure keyboard doesnt overlay component 
                one is typing in. the vertical offset is the amount of pixel it slides up and we can see.
                position repositions the entire screen by 30 pixels   */}
                <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="30">
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.screen}>
                <TitleText style={styles.title}>Start a New Game!</TitleText>
                <Card style={styles.inputContainer}>
                <BodyText>Select a Number of Cookies To Put In The Jar</BodyText>
                    <Input blurOnSubmit 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    keyboardType="number-pad" 
                    maxLength={2} 
                    style={styles.input}
                    // onChangeText expects you to pass in a callback function and that
                    // Callback is called when the text input's text changes.
                    //  The Changed text is passed as an argument to the callback handler.
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                
                <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}><Button color={Colors.accent} title="Reset" onPress={handleResetInput}  /></View> 
                <View style={{width: buttonWidth}}><Button color={Colors.primary} title="Confirm" onPress={handleConfirmInput} /></View> 
                </View>
                </Card>
                {confirmed ? null :
                <View style={styles.cookiePicContainer}>
                    <Image fadeDuration={1000} source={require('../assets/emptyjar.png')} style={styles.cookiePic} resizeMode="cover"/>
                </View>}
                {confirmedOutput}
            

            </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title:{
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold"
        

    },
    inputContainer:{
        width: "80%",
        // maxWidth: "80%",
        minWidth: 300,
        maxWidth: "95%",
        alignItems: "center"

    },
    buttonContainer:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15

    },
    button: {
        // width: 100
        // we use the React Native Dimensions API to get the dimension of the button
        // the get method allows us to recieve the dimensions of the window
        // this gives an object where we can get 4 properities 
        // we get the overall width the app runs on and we want two button to fit on the screen
        // so divide by 4
        // width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    }, 
    summaryContainer: {
        margin: 20,
        // now the number and words are centered instead of the default stretch
        // border box now only takes up as much space as number
        // when align Items to center
        alignItems: 'center',
    },
    text:{
        fontFamily: "open-sans"
    },
    cookiePicContainer:{
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        width: 200,
        height: 200,
        // any child inside of the container that would go out of the container is cut off with overflow
        overflow: "hidden",
        marginVertical: 5
    },
    cookiePic:{
        width: "100%",
         height: "100%",

    },
})

export default  StartGameScreen