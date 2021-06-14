export interface StudentPlace {
    student: Student;
    speed:   number;
    place:   number;
}

export interface Student {
    id:        number;
    Codigo:    string;
    Nombre:    string;
    imagen:    string;
    Tiempo:    string;
    Distancia: string;
}
