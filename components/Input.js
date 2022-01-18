import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

const Input = props => {
    return(
        //React allows us to pass props using the spread operator
        // this allows us to customize our Input components and use
        // textInput props like keyboardType. the style prop takes all the styles
        // from the stylesheet in this component and then also adds the styleSheet
        // being used on the TextInput in a different component. EX: Component StartGameScreen
        <TextInput {...props} style={{...styles.input, ...props.style}} />

    )
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10
    }

})

export default Input 