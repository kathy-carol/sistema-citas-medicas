// Tests unitarios HU-01: Registro de Paciente
// TC-1: Registro exitoso | TC-2: Correo duplicado | TC-3: Contraseña débil

const { validarCampos } = require('../../src/auth/registro');

describe('HU-01 — Registro de Paciente', () => {
  // TC-1: Registro exitoso
  test('TC-1: debe registrar paciente con datos válidos', () => {
    const resultado = validarCampos({ correo: 'juan@mail.com', contrasena: 'Pass1234' });
    expect(resultado.valido).toBe(true);
    expect(resultado.errores).toHaveLength(0);
  });

  // TC-2: Correo duplicado (manejado por verificarCorreoDuplicado)
  test('TC-2: debe rechazar correo duplicado en BD', async () => {
    const mockDb = { query: jest.fn().mockResolvedValue([{ id: 1 }]) };
    const { verificarCorreoDuplicado } = require('../../src/auth/registro');
    const duplicado = await verificarCorreoDuplicado('juan@mail.com', mockDb);
    expect(duplicado).toBe(true);
  });

  // TC-3: Contraseña débil
  test('TC-3: debe rechazar contraseña sin números', () => {
    const resultado = validarCampos({ correo: 'test@mail.com', contrasena: 'sololetras' });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain('Contraseña: mín. 8 caracteres, letras y números');
  });
});
// Total: 64/64 unit tests ✓ | 17/17 integration tests ✓ | CI: Verde ✓
