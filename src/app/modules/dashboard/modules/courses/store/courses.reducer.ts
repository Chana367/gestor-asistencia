import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models/course.interface';

export const COURSES_FEATURE_KEY = 'courses';

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.loadCoursesSuccess, (state, action) => ({
    ...state,
    courses: action.courses,
    loading: false,
    error: null,
  })),
  on(CoursesActions.loadCoursesFailure, (state, action) => ({
    ...state,
    loading: false,
    courses: [],
    error: action.error,
  })),
  on(CoursesActions.createCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.createCourseSuccess, (state, action) => ({
    ...state,
    courses: [...state.courses, action.course],
    loading: false,
    error: null,
  })),
  on(CoursesActions.createCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(CoursesActions.updateCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.updateCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.map(course =>
      course.id === action.course.id ? action.course : course
    ),
    loading: false,
    error: null,
  })),
  on(CoursesActions.updateCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(CoursesActions.deleteCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CoursesActions.deleteCourseSuccess, (state, action) => ({
    ...state,
    courses: state.courses.filter(course => course.id !== action.id),
    loading: false,
    error: null,
  })),
  on(CoursesActions.deleteCourseFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  }))
);

export const coursesFeature = createFeature({
  name: COURSES_FEATURE_KEY,
  reducer: coursesReducer,
});
