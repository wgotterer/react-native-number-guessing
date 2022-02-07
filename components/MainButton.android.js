import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native'
import colors from '../constants/colors'

const MainButton = props => {

    let ButtonComponent = TouchableOpacity

    // check version because only android version 21 and higher supports ripple effect
    if(Platform.Version >= 21){
        ButtonComponent = TouchableNativeFeedback
    }
    return(
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View> 

    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius: 25,
        overflow: "hidden"
    },
    button:{
        backgroundColor: colors.primary,
        // adds some space between top and bottom
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText:{
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18
    }

})

export default MainButton 