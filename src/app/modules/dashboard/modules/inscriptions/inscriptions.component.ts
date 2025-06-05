import { Component, inject, OnInit } from '@angular/core';
import { Inscription } from './models/inscription.interface';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../../core/services/auth.service';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../../../core/models';
import { Store } from '@ngrx/store';
import {
  selectInscriptions,
  selectInscriptionsError,
  selectInscriptionsLoading,
} from './store/inscriptions.selectors';
import { InscriptionsActions } from './store/inscriptions.actions';
import { InscriptionsFormComponent } from './components/inscriptions-form/inscriptions-form.component';
import { InscriptionsDeleteComponent } from './components/inscriptions-delete/inscriptions-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscriptions',
  standalone: false,
  templateUrl: './inscriptions.component.html',
  styles: ``
})
export class InscriptionsComponent implements OnInit {

  inscriptions$: Observable<Inscription[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  readonly dialog = inject(MatDialog);
  authUser$: Observable<User | null>;


  // this.loadInscriptions(); // Carga los inscripciones usando un observable
  constructor(private authService: AuthService, private store: Store, private router: Router) {
    this.authUser$ = this.authService.authUser$;
    this.inscriptions$ = this.store.select(selectInscriptions);
    this.isLoading$ = this.store.select(selectInscriptionsLoading);
    this.error$ = this.store.select(selectInscriptionsError);
  }

  ngOnInit(): void {
    this.onLoadInscriptions(); // Carga las inscripciones al iniciar el componente
  }

  async onSaveInscription(id?: number): Promise<void> {
    let inscription: Inscription | null = null;
    if (id) {
      const inscriptions = await firstValueFrom(this.inscriptions$);
      inscription = inscriptions?.find(insc => String(insc.id) === String(id)) ?? null;
    }
    const dialogRef = this.dialog.open(InscriptionsFormComponent, {
      width: '60vw',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      disableClose: true,
      data: { inscription }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id) {
          // Si se abrió en modo edición, siempre es una actualización
          this.store.dispatch(InscriptionsActions.updateInscription({ inscription: { ...result, id } }));
        } else {
          // Si no hay id, siempre es creación
          this.store.dispatch(InscriptionsActions.createInscription({ inscription: result }));
        }
      }
    });
  }

  onLoadInscriptions() {
    this.store.dispatch(InscriptionsActions.loadInscriptions());
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
        this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
      }
    });
  }
}
