import React, { useState } from 'react';
import { Student } from '../../interfaces/Student.interface';

import StudentContext from './StudentContext';

const StudentState: React.FC = ({ children }) => {

    const [student, setStudent] = useState<Student>({});

    return (
        <StudentContext.Provider
            value={{
                student,
                setStudent,
            }}
        >
            { children }
        </StudentContext.Provider>
    )
}

export default StudentState;
