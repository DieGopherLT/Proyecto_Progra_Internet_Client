import { createContext } from 'react';

import { RankReducerProps } from './RankReducer';

interface RankContextProps extends RankReducerProps{
    changeData: () => void;
}

const rankContext = createContext({} as RankContextProps);

export default rankContext;
