import React from 'react'
import Colors from '../constants/colors'
import {View, StyleSheet, Text, Platform} from 'react-native'
import TitleText from './TitleText'

 const Head = props => {
     return(
        <View style={styles.header}>
        <TitleText style={styles.title}>{props.titles}</TitleText>
    </View>
     )
 }

 const styles = StyleSheet.create({

    header:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Platform.OS == "android" ? Colors.primary : "white",
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: Platform.OS == "ios" ? "#ccc" : "transparent",
        borderBottomWidth: Platform.OS == "ios" ? 1 : 0
    },
    title: {
        color: Platform.OS === "ios" ? Colors.primary : "white"
    }
 })
export default Head