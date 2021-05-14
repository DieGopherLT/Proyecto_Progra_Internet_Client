import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const image = require('../assets/images/1200px-Escudo_UdeG.svg.png');

const UdgLogo = () => {

    return (
        <View style={ styles.imageContainer }>
            <Image 
                source={ image }
                style={ styles.imageSize }
                resizeMethod='resize'
                resizeMode='contain'
            />            
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginVertical: 5,
    },  
    imageSize: {
        height: 170,
        width: 170,
    }
});

export default UdgLogo;
