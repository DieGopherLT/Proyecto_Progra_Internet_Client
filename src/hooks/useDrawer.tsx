import React, { FC, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { DrawerContentProps } from '../components/drawer/DrawerContent';

interface useDrawerReturn {
    open: boolean;
    toggleOpen: () => void;
    drawerContent: () => JSX.Element;
}

const useDrawer = (Content: FC<DrawerContentProps>): useDrawerReturn => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleOpen = () => setOpen(!open);

    const drawerContent = () => (
        <View style={ styles.background }>
            <Content toggleOpen={ toggleOpen } />
        </View>
    );

    return {
        open,
        toggleOpen,
        drawerContent,
    };
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#033842',
        padding: 10,
    },
});

export default useDrawer;
