import React, { FunctionComponent, useReducer, useContext, useEffect } from 'react';

import useFetch from '../../hooks/useFetch';

import RankReducer, { RankReducerProps } from './RankReducer';
import RankContext from './RankContext';
import StudentContext from '../StudentContext/StudentContext';

import { RankData } from '../../interfaces/Responses';
import { StudentPlace } from '../../interfaces/RankData.interface';

const RankState: FunctionComponent = ({ children }) => {

    const { student: { code } } = useContext(StudentContext);

    const initialState: RankReducerProps = {
        dataLoaded: false,
        studentDidUpdateData: true,
        studentRankList: []
    }

    const [state, dispatch] = useReducer(RankReducer, initialState);

    const changeData = () => {
        dispatch({
            type: 'STUDENT_DATA_CHANGED'
        });
    };

    const setRankList = (payload: StudentPlace[]) => {
        dispatch({
            type: 'GET_RANK_LIST',
            payload
        });
    }

    return (
        <RankContext.Provider
            value={{
                dataLoaded: state.dataLoaded,
                studentDidUpdateData: state.studentDidUpdateData,
                studentRankList: state.studentRankList,

                changeData,
                setRankList
            }}
        >
            { children }
        </RankContext.Provider>
    )
}

export default RankState;
