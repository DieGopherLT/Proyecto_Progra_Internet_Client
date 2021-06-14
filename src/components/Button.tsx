import React, { FunctionComponent } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, StyleProp, ViewStyle } from 'react-native';

interface ButtonProps{
    backgroundColor: string;
    text: string;
    onPress: (...args: any[]) => void;
    containerStyles: StyleProp<ViewStyle>;
}

const Button: FunctionComponent<ButtonProps> = ({ backgroundColor, text, containerStyles, onPress }) => {

    return (
        <View style={ containerStyles }>
            <TouchableHighlight
                style={ [ styles.content, { backgroundColor } ] }
                onPress={ onPress }
            >
                <Text style={ styles.text }>{ text }</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        borderRadius: 10
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    }
});

export default Button;
