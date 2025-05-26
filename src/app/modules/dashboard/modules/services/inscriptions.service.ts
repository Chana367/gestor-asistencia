import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inscription } from '../inscriptions/models/inscription.interface';

@Injectable({ providedIn: 'root' })

export class InscriptionsService {

  private inscriptions: Inscription[] = [];
  private inscriptionsSubject = new BehaviorSubject<Inscription[]>([]);
  inscriptions$ = this.inscriptionsSubject.asObservable();

  private apiUrl = 'http://localhost:3000/inscriptions';

  constructor(private http: HttpClient) {
    // Cargar inscripciones iniciales desde la API
    this.http.get<Inscription[]>(this.apiUrl).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.inscriptions = response;
          this.inscriptionsSubject.next(this.inscriptions);
        } else {
          console.warn('No se encontraron inscripciones');
        }
      },
      error: (err) => {
        console.error('Error al obtener inscripciones:', err);
      }
    });
  }

  getInscriptions$(): Observable<Inscription[]> {
    return this.inscriptions$;
  }

  getInscriptionById(id: string | null): Observable<Inscription | null> {
    return this.http.get<Inscription[]>(`${this.apiUrl}?id=${id}`).pipe(
      map((response) => (response && response.length > 0 ? response[0] : null))
    );
  }

  postInscription(newInscription: Inscription, id?: number): void {
    if (newInscription) {
      if (!id) {
        // POST: Crear nueva inscripción
        this.http.post<Inscription>(this.apiUrl, newInscription).subscribe({
          next: (createdInscription) => {
            this.inscriptions = [...this.inscriptions, createdInscription];
            this.inscriptionsSubject.next(this.inscriptions);
            console.log('Nueva inscripción agregada:', createdInscription);
          },
          error: (err) => {
            console.error('Error al agregar inscripción:', err);
          }
        });
      } else {
        // PUT: Actualizar inscripción existente
        this.http.put<Inscription>(`${this.apiUrl}/${id}`, newInscription).subscribe({
          next: (updatedInscription) => {
            this.inscriptions = this.inscriptions.map((inscription) =>
              inscription.id === id ? updatedInscription : inscription
            );
            this.inscriptionsSubject.next(this.inscriptions);
            console.log('Inscripción actualizada:', updatedInscription);
          },
          error: (err) => {
            console.error('Error al actualizar inscripción:', err);
          }
        });
      }
    }
  }

  deleteInscription(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.inscriptions = this.inscriptions.filter((inscription) => inscription.id !== id);
        this.inscriptionsSubject.next(this.inscriptions);
        console.log('Inscripción eliminada:', id);
      },
      error: (err) => {
        console.error('Error al eliminar inscripción:', err);
      }
    });
  }
}
