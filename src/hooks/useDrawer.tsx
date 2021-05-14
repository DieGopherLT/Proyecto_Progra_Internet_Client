import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { DrawerContentProps } from '../components/drawer/DrawerContent';

//Este hook está pensado para proveer props al componente Drawer y hacer disponible la función "toggleOpen"
const useDrawer = (Content: React.FC<DrawerContentProps>) => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen(!open);

    const drawerContent = () => (
        <View style={ styles.animatedBox }>
            <Content toggleOpen={ toggleOpen } />
        </View>
    );

    return {
        toggleOpen,
        drawerContent,
        open
    }
}

const styles = StyleSheet.create({
    animatedBox: {
        flex: 1,
        backgroundColor: '#033842',
        padding: 10,
    },
});

export default useDrawer;
