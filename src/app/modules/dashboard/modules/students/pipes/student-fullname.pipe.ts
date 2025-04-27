import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../models';

@Pipe({
  name: 'studentFullname',
  standalone: false
})
export class StudentFullnamePipe implements PipeTransform {

  transform(value: Student, ...args: unknown[]): unknown {
    return value ? `${value.name} ${value.lastName}` : '';
  }

}
