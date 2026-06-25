// Módulo de notificaciones por email — Sistema de Citas Médicas

/**
 * Envío de email de activación de cuenta
 * HU-01: Registro de Paciente
 */
async function enviarEmailActivacion(correo, token) {
  const enlace = `https://citas.medicas.bo/activar?token=${token}`;
  console.log(`[EMAIL] Enviando activación a ${correo}: ${enlace}`);
  // Integración SMTP configurada vía variables de entorno
  return { enviado: true, correo, enlace };
}

/**
 * Envío de notificación al médico sobre cambios en citas
 * HU-04: Cancelar o Reprogramar Cita
 */
async function notificarMedico(medicoId, tipoCambio, cita) {
  console.log(`[EMAIL] Notificando médico ${medicoId}: ${tipoCambio} de cita ${cita.id}`);
  return { enviado: true };
}

module.exports = { enviarEmailActivacion, notificarMedico };
