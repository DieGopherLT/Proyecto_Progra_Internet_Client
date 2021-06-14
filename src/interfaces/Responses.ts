import { StudentPlace } from './RankData.interface';

export interface StudentResponse{
    msg: string;
    studentCreated: true;
}

export interface UploadResponse{
    msg?: string;
    img?: string;
    filename?: string;
    host?: string;
}

export interface SubmitInitialDataResponse {
    currentStudentPlace: number;
    lastPlace:           number;
    studentPlace:        StudentPlace;
    date:                string;
}

export interface RankData {
    positionList: StudentPlace[];
    studentPlace: StudentPlace | null;
}
