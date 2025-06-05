import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Course } from "../models/course.interface";

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: Course[] }>(),
    'Load Courses Failure': props<{ error: string }>(),

    'Create Course': props<{ course: Course }>(),
    'Create Course Success': props<{ course: Course }>(),
    'Create Course Failure': props<{ error: string }>(),

    'Update Course': props<{ course: Course }>(),
    'Update Course Success': props<{ course: Course }>(),
    'Update Course Failure': props<{ error: string }>(),

    'Delete Course': props<{ id: number }>(),
    'Delete Course Success': props<{ id: number }>(),
    'Delete Course Failure': props<{ error: string }>(),
  },
});
