import React, { FunctionComponent, useReducer, useContext, useEffect } from 'react';

import useFetch from '../../hooks/useFetch';

import RankReducer, { RankReducerProps } from './RankReducer';
import rankContext from './RankContext';
import StudentContext from '../StudentContext/StudentContext';

import { RankData } from '../../interfaces/Responses';

const RankState: FunctionComponent = ({ children }) => {

    const { student: { code } } = useContext(StudentContext);

    const initialState: RankReducerProps = {
        dataLoaded: false,
        studentDidUpdateData: true,
        studentRankList: []
    }

    const [state, dispatch] = useReducer(RankReducer, initialState);

    const [ rankDataRequest ] = useFetch<RankData>({
        url: `https://progra-internet-server.herokuapp.com/api/student/${ code }`,
        method: 'GET',
    });

    useEffect(() => {
        const fetchData = async () => {
            if(state.studentDidUpdateData){
                try {
                    const { positionList, studentPlace } = await rankDataRequest();
                    const payload = (studentPlace) ? [...positionList, studentPlace] : [...positionList];
                    dispatch({ type: 'GET_RANK_LIST', payload });
                }
                catch(e) {
                    console.log(e);
                    dispatch({ type: 'GET_RANK_LIST', payload: [] });
                }
            }
        }
        fetchData();
    }, [state.studentDidUpdateData]);

    const changeData = () => {
        dispatch({
            type: 'STUDENT_DATA_CHANGED'
        });
    };

    return (
        <rankContext.Provider
            value={{
                dataLoaded: state.dataLoaded,
                studentDidUpdateData: state.studentDidUpdateData,
                studentRankList: state.studentRankList,

                changeData
            }}
        >
            { children }
        </rankContext.Provider>
    )
}

export default RankState;
