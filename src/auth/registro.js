// HU-01: Registro de Paciente
// Sprint 1 — Fase: En Desarrollo

const { validateEmail, validatePassword } = require('../shared/utils');

/**
 * Formulario de registro de paciente
 * Campos: nombre, correo, contraseña, teléfono, documento
 */
function renderFormularioRegistro() {
  return {
    campos: ['nombre', 'correo', 'contrasena', 'telefono', 'documento'],
    titulo: 'Registro de Nuevo Paciente'
  };
}

module.exports = { renderFormularioRegistro };

/**
 * Validación formato correo y contraseña
 * Política: mínimo 8 caracteres, letras y números
 */
function validarCampos({ correo, contrasena }) {
  const errores = [];
  if (!validateEmail(correo)) errores.push('Correo inválido');
  if (!validatePassword(contrasena)) errores.push('Contraseña: mín. 8 caracteres, letras y números');
  return { valido: errores.length === 0, errores };
}

module.exports = { renderFormularioRegistro, validarCampos };

/**
 * Verificación de correos duplicados en BD
 */
async function verificarCorreoDuplicado(correo, db) {
  const existe = await db.query('SELECT id FROM pacientes WHERE correo = ?', [correo]);
  return existe.length > 0;
}
