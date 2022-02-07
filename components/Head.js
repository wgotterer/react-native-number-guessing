import React from 'react'
import Colors from '../constants/colors'
import {View, StyleSheet, Text, Platform} from 'react-native'
import TitleText from './TitleText'

 const Head = props => {
     return(
        <View style={{
            ...styles.headerBase, 
            ...Platform.select({
                ios: styles.headerIOS, 
                android: styles.headerAndroid
               })
             }}
            >
        <TitleText style={styles.title}>{props.titles}</TitleText>
    </View>
     )
 }

 const styles = StyleSheet.create({

    headerBase:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
       
    },
    headerIOS: {
        backgroundColor:  "white",
        borderBottomColor:  "#ccc",
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    title: {
        color: Platform.OS === "ios" ? Colors.primary : "white"
    }
 })
export default Head