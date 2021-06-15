import { StudentPlace } from '../../interfaces/RankData.interface';

export interface RankReducerProps{
    dataLoaded: boolean;
    studentRankList: StudentPlace[];
    studentDidUpdateData: boolean;
}

type RankReducerActions =
    | { type: 'GET_RANK_LIST', payload: StudentPlace[] }
    | { type: 'STUDENT_DATA_CHANGED' }

const RankReducer = (state: RankReducerProps, action: RankReducerActions) => {

    switch(action.type){
        case 'GET_RANK_LIST':
            return {
                ...state,
                studentRankList: action.payload,
                dataLoaded: true,
                studentDidUpdateData: false
            };
        case 'STUDENT_DATA_CHANGED':
            return {
                ...state,
                studentDidUpdateData: true,
                dataLoaded: false
            };
        default:
            return {
                ...state
            };
    }
}

export default RankReducer;
