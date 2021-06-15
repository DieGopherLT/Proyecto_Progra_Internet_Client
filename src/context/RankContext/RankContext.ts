import { createContext } from 'react';

import { RankReducerProps } from './RankReducer';
import { StudentPlace } from '../../interfaces/RankData.interface';

interface RankContextProps extends RankReducerProps{
    changeData: () => void;
    setRankList: (payload: StudentPlace[]) => void;
}

const RankContext = createContext({} as RankContextProps);

export default RankContext;
