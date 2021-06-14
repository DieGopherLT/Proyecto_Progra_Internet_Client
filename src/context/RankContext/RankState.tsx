import React, { FunctionComponent, useState } from 'react';

import rankContext from './RankContext';

interface RankStateProps{

}

const RankState: FunctionComponent<RankStateProps> = ({ children }) => {

    const [currentStudentUpdatedData, setCurrentStudentUpdatedData] = useState<boolean>(false);

    return (
        <rankContext.Provider
            value={{
                currentStudentUpdatedData,
                setCurrentStudentUpdatedData
            }}
        >
            { children }
        </rankContext.Provider>
    )
}


export default RankState;
