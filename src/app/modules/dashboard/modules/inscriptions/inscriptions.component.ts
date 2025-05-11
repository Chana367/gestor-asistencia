import { Component, inject } from '@angular/core';
import { Inscription } from './models/inscription.interface';
import { MatDialog } from '@angular/material/dialog';
import { InscriptionsService } from '../services/inscriptions.service';
import { InscriptionsDeleteComponent } from './components/inscriptions-delete/inscriptions-delete.component';
import { InscriptionsFormComponent } from './components/inscriptions-form/inscriptions-form.component';

@Component({
  selector: 'app-inscriptions',
  standalone: false,
  templateUrl: './inscriptions.component.html',
  styles: ``
})
export class InscriptionsComponent {
  inscriptions: Inscription[] = [];
  isLoading: boolean = true; // Variable para controlar el estado de carga
  readonly dialog = inject(MatDialog);

  constructor(private inscriptionService: InscriptionsService) {
    this.loadInscriptions(); // Carga los inscripciones usando un observable
  }

  loadInscriptions() {
    this.inscriptionService.getInscriptions$().subscribe({
      next: (inscriptions) => {
        this.inscriptions = inscriptions;
        console.log('Incripciones cargados:', this.inscriptions);
      },
      error: (error: any) => console.error('Error al cargar los inscripciones:', error),
      complete: () => {
        this.isLoading = false; // Cambia el estado de carga a falso una vez que se cargan los inscripciones
        console.log('Carga de inscripciones completada');
      }
    });
  }

  onSaveInscription(id?: number): void {
    const inscription = id ? this.inscriptions.find(inscription => inscription.id === id) : null; // Busca el inscripcion por ID si se proporciona uno
    const dialogRef = this.dialog.open(InscriptionsFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true, // Deshabilita el cierre al hacer clic fuera del dialog
      data: { inscription: inscription } // Pasa los datos del inscripcion al formulario
    });

    dialogRef.afterClosed().subscribe(result => {
      this.inscriptionService.postInscription(result, id); // Guarda el nuevo inscripcion o los cambios realizados
      this.loadInscriptions(); // Recarga la lista de inscripciones
    });
  }

  onDeleteInscription(id: number) {
    const dialogRef = this.dialog.open(InscriptionsDeleteComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      autoFocus: false, // Deshabilita el enfoque automatico en el dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.inscriptionService.deleteInscription(id); // Elimina el inscripcion si se confirma
        this.loadInscriptions(); // Recarga la lista de inscripciones
      }
    });
  }
}
