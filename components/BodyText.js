import {View, Text, StyleSheet} from 'react-native'
import React from 'react'


const BodyText = props => {
    return (

        <Text style={{...styles.body, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({

    
body:{
    fontFamily: 'open-sans',
    textAlign: "center"
}
   
})

export default BodyText