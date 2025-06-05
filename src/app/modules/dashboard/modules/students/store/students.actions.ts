import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Student } from "../models";

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: string }>(),

    'Create Student': props<{ student: Student }>(),
    'Create Student Success': props<{ student: Student }>(),
    'Create Student Failure': props<{ error: string }>(),

    'Update Student': props<{ student: Student }>(),
    'Update Student Success': props<{ student: Student }>(),
    'Update Student Failure': props<{ error: string }>(),

    'Delete Student': props<{ id: number }>(),
    'Delete Student Success': props<{ id: number }>(),
    'Delete Student Failure': props<{ error: string }>(),
  },
});
