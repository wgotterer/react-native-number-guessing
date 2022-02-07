import React from 'react'
import {View, StyleSheet, Image, Button, ScrollView, Dimensions, Text, SafeAreaView} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import colors from '../constants/colors'
import MainButton from '../components/MainButton'



 const GameOverScreen = props => {
     return(
         <ScrollView>
            <View style={styles.screen}>
            <TitleText >The Game is Over!</TitleText  >
            <View style={styles.imageContainer}>
            {/* we use the require function that takes  a string pointing to our image becuase
            behind the scenes it allows us to effectively load image and determine it's height and width */}
            {/* the resizeMode property set to contain so it doesnt crop out any of the image. Using default cover so it fills the cricle */}
            <Image fadeDuration={1000} source={require('../assets/cookiemonster.jpeg')} style={styles.image} resizeMode="cover"/>
            {/* Below is a network image. For network images one has to specify the width and height whereas as locally there is a default */}
            {/* <Image source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4pimsU7lED3BRjccLEw4Mk_HqcR3RJb5Ov7RpfSGaSiEvZq7XJF-MfwbWKEhO6NKQXcM&usqp=CAU" }} style={styles.image} resizeMode="cover"/> */}

            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText} >
                Your phone needed 
                {/* Text within text compnonents recieves the styling from it's outter text components. 
                On the other hand, A view would not pass styling down to it's children.
                Text does not use flexbox. View does. Text will automatically wrap itself into a new line if
                it doesnt fit.  */}
                <Text style={styles.highlight}> {props.roundsNumber} </Text>
                rounds to guess the number, 
            <Text style={styles.highlight}> {props.userNumber}</Text>,
                of cookies in the cookie jar 
            </BodyText >
            </View>
            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
    </ScrollView>
     )
 }

 const styles = StyleSheet.create({
     screen: {
         flex:1,
         justifyContent: "center",
         alignItems: "center",
         paddingVertical: 10

     },

     imageContainer: {
        borderRadius: Dimensions.get("window").width * 0.7 / 2,
        borderWidth: 3,
        borderColor: "black",
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        // any child inside of the container that would go out of the container is cut off with overflow
        overflow: "hidden",
        marginVertical: Dimensions.get("window").height / 30

     },

     image: {
         width: "100%",
         height: "100%",
        
     },
     resultContainer: {
         marginHorizontal: 30,
         marginVertical: Dimensions.get("window").height / 60
     },
     resultText:{
        //  Text components have special style to center (textAlign)
        // wasn't centering because BodyText already had text styles. 
        // In BodyText passed an object and using the spread operator added props.style
        // to to into acount the textAlign
         textAlign: "center",
         fontSize: Dimensions.get("window").height < 600 ? 16 : 20
     },

     highlight: {
         color: colors.primary,
         fontFamily: "open-sans-bold"
         
     }
    

 })
export default GameOverScreen