import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';
import { Student } from '../models';

export const STUDENTS_FEATURE_KEY = 'students';

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
};

const studentsReducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.loadStudentsSuccess, (state, action) => ({
    ...state,
    students: action.students,
    loading: false,
    error: null,
  })),
  on(StudentsActions.loadStudentsFailure, (state, action) => ({
    ...state,
    students: [],
    loading: false,
    error: action.error,
  })),
  on(StudentsActions.createStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.createStudentSuccess, (state, action) => ({
    ...state,
    students: [...state.students, action.student],
    loading: false,
    error: null,
  })),
  on(StudentsActions.createStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(StudentsActions.updateStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.updateStudentSuccess, (state, action) => ({
    ...state,
    students: state.students.map(student =>
      student.id === action.student.id ? action.student : student
    ),
    loading: false,
    error: null,
  })),
  on(StudentsActions.updateStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(StudentsActions.deleteStudent, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentsActions.deleteStudentSuccess, (state, action) => ({
    ...state,
    students: state.students.filter(student => student.id !== action.id),
    loading: false,
    error: null,
  })),
  on(StudentsActions.deleteStudentFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export const studentsFeature = createFeature({
  name: STUDENTS_FEATURE_KEY,
  reducer: studentsReducer,
});
