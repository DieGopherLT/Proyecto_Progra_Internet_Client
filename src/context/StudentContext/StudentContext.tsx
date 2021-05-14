import { Dispatch, SetStateAction, createContext } from 'react';
import { Student } from '../../interfaces/Student.interface';

export interface StudentContextProps{
    student: Student;
    setStudent: Dispatch<SetStateAction<Student>>
    token?: string;
}

const StudentContext = createContext({} as StudentContextProps);

export default StudentContext;
