import React from 'react'
import Card from '../components/Card'
import {View, StyleSheet, Text, Button} from 'react-native'
import Colors from '../constants/colors'
import Input from '../components/Input'

const StartGameScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <Input style={styles.input} />
            
            <View style={styles.buttonContainer}>
            <View style={styles.button}><Button color={Colors.accent} title="Reset"  /></View> 
            <View style={styles.button}><Button color={Colors.primary} title="Confirm" /></View> 
            </View>
            </Card>
           

        </View>
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

    },
    inputContainer:{
        width: 300,
        maxWidth: "80%",
        alignItems: "center"

    },
    buttonContainer:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15

    },
    button: {
        width: 100
    },
    input: {
        width: 50
    }
})

export default  StartGameScreen