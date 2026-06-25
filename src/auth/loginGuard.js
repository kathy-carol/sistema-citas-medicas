// BUG-002: Bloquear login sin confirmar correo
// Detectado en: QA Paso 4 | Severidad: Media/P2

/**
 * Guard: verifica que el paciente haya confirmado su correo
 * antes de permitir el inicio de sesión
 */
function verificarCuentaActivada(paciente) {
  if (!paciente.activo) {
    throw new Error('BUG-002-FIX: Cuenta no activada. Revise su correo y haga clic en el enlace de activación.');
  }
  return true;
}

module.exports = { verificarCuentaActivada };
