import React, { FunctionComponent, Fragment } from 'react';

import StudentCard from '../StudentCard/StudentCard';

import { StudentPlace } from '../../../interfaces/RankData.interface';

interface RankListProps {
    studentRankList: StudentPlace[];
}

const List: FunctionComponent<RankListProps> = ({ studentRankList }) => {

    return (
        <>
            { studentRankList.map(({ student, place }) => (
                <StudentCard
                    key={ student.id }
                    student={ student }
                    place={ place }
                />
            )) }
        </>
    );
};


export default List;
