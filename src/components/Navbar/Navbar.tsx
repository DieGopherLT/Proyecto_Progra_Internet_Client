import React, { FunctionComponent } from 'react';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import { styles } from './styles';

interface NavbarProps{
    toggleOpen: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ toggleOpen }) => {

    const miniLogo = require('../../assets/images/NavLogoRecortado.png');

    return (
        <View style={ styles.navBar }>
            <View style={ styles.menuContainer }>
                <Icon
                    name="list"
                    type="foundation"
                    onPress={ toggleOpen }
                    size={ 50 }
                    color="#FFF"
                />

                <Image
                    source={ miniLogo }
                    resizeMethod='auto'
                    resizeMode='center'
                    style={{ height: 70, width: 120 }}
                />
            </View>
        </View>
    );
}

export default Navbar;
