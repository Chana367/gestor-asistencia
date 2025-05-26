import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

// Describe agrupa los componentes de prueba
describe('AppComponent', () => {
  beforeEach(async () => { // se ejecuta antes de cada caso de prueba
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    // Creamos el componente
    const fixture = TestBed.createComponent(AppComponent);
    // Extraemos la instancia del componente
    const app = fixture.componentInstance;
    // Espero que ...
    expect(app)
    // Matcher son funciones que permiten hacer comparaciones
    // != undefined y null
      .toBeTruthy();
  });

  it(`should have as title 'gestor-asistencia'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title)
      // title == ...
      .toEqual('gestor-asistencia');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Detectamos ccambios
    const compiled = fixture.nativeElement as HTMLElement; //extraigo elemento nativo
    // esperamos que el elemento nativo contenga ...
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, gestor-asistencia');
  });
});
