import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { User } from '../models';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Prepara el entorno de prueba para AuthService con un Router espiado y HttpClientTestingModule para interceptar requests
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear(); // Limpia el token antes de cada prueba
  });

  afterEach(() => {
    // Verifica que no queden requests pendientes y limpia el localStorage después de cada prueba
    httpMock.verify();
    localStorage.clear();
  });

  // Prueba para verificar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Prueba del método login: realiza un login exitoso, guarda el token y el usuario, y redirige a dashboard
  it('should login and set user and token', () => {
    const mockUser: User = { id: 1, username: 'test', email:"test@gmail.com" , password: '123', token: 'abc', role: 'admin' };

    service.login('test', '123'); // Llama al login con usuario y contraseña correctos

    const req = httpMock.expectOne('http://localhost:3000/users?username=test&password=123');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]); // Simula respuesta con el usuario encontrado

    // Verifica que el usuario autenticado sea el esperado
    service.authUser$.subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    // Verifica que el token se haya guardado en localStorage
    expect(localStorage.getItem('token')).toBe('abc');

    // Verifica que se haya llamado a la navegación al dashboard
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  // Prueba del login fallido: no debería autenticarse, muestra alerta y authUser$ debe ser null
  it('should not login with invalid credentials', () => {
    spyOn(window, 'alert'); // Espía la función alert

    service.login('wrong', 'wrong'); // Llama al login con datos incorrectos

    const req = httpMock.expectOne('http://localhost:3000/users?username=wrong&password=wrong');
    req.flush([]); // Simula respuesta vacía (sin usuarios encontrados)

    // Verifica que se haya mostrado la alerta
    expect(window.alert).toHaveBeenCalledWith('Invalid username or password');

    // Verifica que el observable authUser$ sea null
    service.authUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  // Prueba del logout: debe borrar el token y poner el authUser$ en null
  it('should logout and clear token', () => {
    localStorage.setItem('token', 'abc'); // Configura un token previamente

    service.logout(); // Llama al método logout

    // Verifica que el token se haya eliminado
    expect(localStorage.getItem('token')).toBeNull();

    // Verifica que el observable authUser$ sea null
    service.authUser$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  // Prueba para verificarToken: debe buscar el usuario con el token y devolverlo si es válido
  it('should verify token and set user if valid', () => {
    const mockUser: User = { id: 1, username: 'test', email:"test@gmail.com" , password: '123', token: 'abc', role: 'admin' };
    localStorage.setItem('token', 'abc'); // Guarda el token previamente

    service.verifyToken().subscribe(result => {
      // Verifica que la respuesta sea el usuario encontrado
      expect(result).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:3000/users?token=abc');
    req.flush([mockUser]); // Simula respuesta con el usuario válido

    // Verifica que el token siga en el localStorage
    expect(localStorage.getItem('token')).toBe('abc');
  });

  // Prueba de verifyToken: si el token es inválido, debe devolver false
  it('should return false if token is invalid', () => {
    localStorage.setItem('token', 'invalid'); // Guarda un token inválido

    service.verifyToken().subscribe(result => {
      // Verifica que la respuesta sea false
      expect(result).toBe(false);
    });

    const req = httpMock.expectOne('http://localhost:3000/users?token=invalid');
    req.flush([]); // Simula respuesta vacía (token no válido)
  });
});
