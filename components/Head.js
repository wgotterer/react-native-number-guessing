import React from 'react'
import Colors from '../constants/colors'
import {View, StyleSheet, Text} from 'react-native'
import TitleText from './TitleText'

 const Head = props => {
     return(
        <View style={styles.header}>
        <TitleText>{props.titles}</TitleText>
    </View>
     )
 }

 const styles = StyleSheet.create({

    header:{
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center"
    }
 })
export default Head