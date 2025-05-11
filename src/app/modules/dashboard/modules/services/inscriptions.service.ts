import { Injectable } from '@angular/core';
import { Inscription } from '../inscriptions/models/inscription.interface';
import { map, Observable, of } from 'rxjs';

let inscriptions: Inscription[] = [
  { id: 1, id_student: 1, id_course: 1, date_inscription: new Date('2023-01-15') },
  { id: 2, id_student: 2, id_course: 2, date_inscription: new Date('2023-02-10') },
  { id: 3, id_student: 3, id_course: 3, date_inscription: new Date('2023-03-05') },
  { id: 4, id_student: 4, id_course: 4, date_inscription: new Date('2023-04-20') },
  { id: 5, id_student: 5, id_course: 5, date_inscription: new Date('2023-05-15') },
  { id: 6, id_student: 1, id_course: 2, date_inscription: new Date('2023-06-10') },
  { id: 7, id_student: 2, id_course: 3, date_inscription: new Date('2023-07-05') },
  { id: 8, id_student: 3, id_course: 4, date_inscription: new Date('2023-08-20') },
  { id: 9, id_student: 4, id_course: 5, date_inscription: new Date('2023-09-15') },
  { id: 10, id_student: 5, id_course: 1, date_inscription: new Date('2023-10-10') }
];

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService {

  getInscriptions$(): Observable<Inscription[]> {
    return new Observable<Inscription[]>((observer) => {
      observer.next(inscriptions);
      observer.complete();
    });
  }

  getInscriptionById(id: string | null): Observable<Inscription | null> {
    return of([...inscriptions]).pipe(
      map((inscriptions) => inscriptions.find((inscription) => inscription.id === Number(id)) || null),
    )
  }

  postInscription(newInscription: Inscription, id?: number): void {
    if (newInscription) {
      if (!id) {
        // Agregar la nueva inscripcion a la lista de inscripciones
        newInscription.id = inscriptions[inscriptions.length - 1].id + 1; // Asignar un ID unico
        inscriptions = [...inscriptions, newInscription]
        console.log('Nuevo inscripcion agregada:', newInscription);
      } else {
        inscriptions = inscriptions.map(inscription => {
          if (inscription.id === id) {
            return { ...inscription, ...newInscription }; // Actualiza la inscripcion existente
          }
          return inscription;
        });
      }
    }
  }

  deleteInscription(id: number): void {
    inscriptions = inscriptions.filter(inscription => inscription.id !== id); // Filtra la inscripcion que se desea eliminar
    console.log('Inscripcion eliminada:', id);
  }

}
