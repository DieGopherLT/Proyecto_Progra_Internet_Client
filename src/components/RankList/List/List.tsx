import React, { FunctionComponent, Fragment } from 'react';
import { FlatList } from 'react-native';

import StudentCard from '../StudentCard/StudentCard';

import { StudentPlace } from '../../../interfaces/RankData.interface';

interface RankListProps {
    studentRankList: StudentPlace[];
}

const List: FunctionComponent<RankListProps> = ({ studentRankList }) => {

    return (
        <Fragment>
            { studentRankList.map(({ student, place }) => (
                <StudentCard
                    key={ student.id }
                    student={ student }
                    place={ place }
                />
            )) }
        </Fragment>
    );
};


export default List;
