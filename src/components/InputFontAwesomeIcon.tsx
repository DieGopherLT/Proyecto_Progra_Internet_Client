import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

import { Input, Icon } from 'react-native-elements';

interface InputWithIconProps {
    name: string;
    value: string;
    placeholder: string;
    label: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    onChangeText: (text: string) => void;
}

//Todos los iconos tienen que ser de font-aweseome
const InputFontAwesomeIcon: React.FC<InputWithIconProps> = props => {

    const { placeholder, name, value, label, onChangeText, keyboardType = 'default', secureTextEntry } = props;

    return (
        <Input
            placeholder={placeholder}
            leftIcon={
                <Icon
                    type='font-awesome'
                    name={name}
                    size={20}
                    color='#000'
                />
            }
            value={value}
            label={label}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
        />
    )
}

export default InputFontAwesomeIcon;