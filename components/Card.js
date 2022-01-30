import {View, StyleSheet} from 'react-native'
import React from 'react'


const Card = props => {
    return (
// Instead of invoking the component with a self-closing tag <Picture /> 
// if you invoke it will full opening and closing tags <Picture> </Picture> 
// you can then place more code between it.
// This de-couples the <Picture> component from its content and makes it more reusable.

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