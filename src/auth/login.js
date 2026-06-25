// HU-02: Inicio de Sesión
// Sprint 1 — Fase: En Desarrollo

const { verificarCuentaActivada } = require('./loginGuard');

const MAX_INTENTOS = 3;
const BLOQUEO_MINUTOS = 15;
const intentosFallidos = new Map(); // pacienteId -> { count, bloqueadoHasta }

/**
 * Módulo de autenticación — Login
 * Campos: correo y contraseña
 */
function renderFormularioLogin() {
  return { campos: ['correo', 'contrasena'], titulo: 'Inicio de Sesión' };
}
module.exports = { renderFormularioLogin };

/**
 * Control de intentos fallidos y bloqueo temporal
 * Máx. 3 intentos, bloqueo 15 min
 */
function verificarBloqueo(pacienteId) {
  const registro = intentosFallidos.get(pacienteId);
  if (!registro) return false;
  if (registro.bloqueadoHasta && new Date() < registro.bloqueadoHasta) return true;
  return false;
}

function registrarIntentoFallido(pacienteId) {
  const registro = intentosFallidos.get(pacienteId) || { count: 0 };
  registro.count += 1;
  if (registro.count >= MAX_INTENTOS) {
    registro.bloqueadoHasta = new Date(Date.now() + BLOQUEO_MINUTOS * 60 * 1000);
  }
  intentosFallidos.set(pacienteId, registro);
}

/**
 * Recuperación de contraseña por email
 */
async function solicitarRecuperacion(correo) {
  const token = Math.random().toString(36).substring(2);
  const enlace = `https://citas.medicas.bo/reset?token=${token}`;
  console.log(`[EMAIL] Enlace de restablecimiento enviado a ${correo}: ${enlace}`);
  return { enviado: true };
}

/**
 * BUG-003 FIX: Reiniciar contador de intentos fallidos tras login exitoso
 * Detectado en: QA Paso 4 | Severidad: Media/P2
 */
function reiniciarContadorIntentos(pacienteId) {
  intentosFallidos.delete(pacienteId);
}

module.exports = { renderFormularioLogin, verificarBloqueo, registrarIntentoFallido, solicitarRecuperacion, reiniciarContadorIntentos };
