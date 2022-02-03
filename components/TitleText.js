import { Text, StyleSheet} from 'react-native'
import React from 'react'


const TitleText = props => {
    return (
            // this takes everything from the title stylesheet object and then the style properties
            // of props will merge with or override the style values from TitleText. 
            // the styles in TitleText are default styles and can be merged or overwritten
        <Text style={{...styles.title, ...props.style}}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({

    
title:{
    fontFamily: 'open-sans-bold',
    fontSize: 14,
    // textAlign: "center"
}
   
})

export default TitleText