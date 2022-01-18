import React from 'react'
import Colors from '../constants/colors'
import {View, StyleSheet, Text} from 'react-native'

 const Head = props => {
     return(
        <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.titles}</Text>
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
    },
    headerTitle: {
        fontSize: 18,
        color: "black"
    }
 })
export default Head