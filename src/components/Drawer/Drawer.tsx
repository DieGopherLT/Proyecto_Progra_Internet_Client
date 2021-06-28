import React, { ReactElement, FC } from 'react';
import MenuDrawer from 'react-native-side-drawer';

import { DrawerContentProps } from './DrawerContent/DrawerContent';

interface DrawerProps{
    open: boolean;
    drawerContent: ReactElement<DrawerContentProps>
}

//Este componente esta pensado para usarse en conjunto del hook "useDrawer"
const Drawer: FC<DrawerProps> = ({ open, drawerContent, children }) => {

    return (
        <MenuDrawer
            open={ open }
            drawerContent={ drawerContent }
            drawerPercentage={ 60 }
            animationTime={ 250 }
            overlay={ true }
            opacity={ 0.4 }
        >
            { children }
        </MenuDrawer>
    )
}

export default Drawer;
