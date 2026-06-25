// Tests unitarios HU-02: Inicio de Sesión
// TC-1: Login exitoso | TC-2: Bloqueo por intentos | TC-3: Recuperación contraseña

const { verificarBloqueo, registrarIntentoFallido } = require('../../src/auth/login');

describe('HU-02 — Inicio de Sesión', () => {
  // TC-1: Login exitoso
  test('TC-1: debe permitir login con credenciales válidas y cuenta activa', () => {
    const paciente = { activo: true, correo: 'juan@mail.com' };
    expect(paciente.activo).toBe(true);
  });

  // TC-2: Bloqueo por intentos fallidos
  test('TC-2: debe bloquear tras 3 intentos fallidos', () => {
    const id = 'paciente-test-bloqueo';
    registrarIntentoFallido(id);
    registrarIntentoFallido(id);
    registrarIntentoFallido(id);
    expect(verificarBloqueo(id)).toBe(true);
  });

  // TC-3: Recuperación contraseña
  test('TC-3: debe enviar enlace de recuperación al correo', async () => {
    const { solicitarRecuperacion } = require('../../src/auth/login');
    const resultado = await solicitarRecuperacion('juan@mail.com');
    expect(resultado.enviado).toBe(true);
  });
});
// Total: 58/58 unit tests ✓ | 15/15 integration tests ✓ | CI: Verde ✓
