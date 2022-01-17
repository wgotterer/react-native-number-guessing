import {View, StyleSheet} from 'react-native'
import React from 'react'


const Card = props => {
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    )
}

const styles = StyleSheet.create({

    
card:{
    shadowColor: "black",
    shadowOffset: {wdith: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 5,
    padding: 20,
    borderRadius: 10

}
   
})

export default Card