import { createContext, Dispatch, SetStateAction } from 'react';

interface RankContextProps{
    currentStudentUpdatedData: boolean;
    setCurrentStudentUpdatedData: Dispatch<SetStateAction<boolean>>;
}

const rankContext = createContext({} as RankContextProps);

export default rankContext;
