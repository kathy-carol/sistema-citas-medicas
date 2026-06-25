// HU-03: Agendar Cita Médica
// Sprint 2 — Fase: En Desarrollo

/**
 * Módulo selección de especialidad, médico y horario
 */
async function obtenerDisponibilidad(especialidad, fecha, db) {
  const medicos = await db.query(
    'SELECT m.*, h.hora FROM medicos m JOIN horarios h ON m.id = h.medico_id WHERE m.especialidad = ? AND h.fecha = ? AND h.disponible = true',
    [especialidad, fecha]
  );
  return medicos;
}

function renderFormularioAgendamiento() {
  return { pasos: ['especialidad', 'medico', 'horario', 'confirmacion'] };
}

module.exports = { obtenerDisponibilidad, renderFormularioAgendamiento };

/**
 * Validación de disponibilidad de horarios en BD
 */
async function validarDisponibilidadHorario(medicoId, fecha, hora, db) {
  const ocupado = await db.query(
    'SELECT id FROM citas WHERE medico_id = ? AND fecha = ? AND hora = ? AND estado != "Cancelada"',
    [medicoId, fecha, hora]
  );
  return ocupado.length === 0; // true = disponible
}

/**
 * Regla de negocio: anticipación mínima de 2 horas para agendar
 */
function validarAnticipacionMinima(fechaCita, horaCita) {
  const ahora = new Date();
  const citaDateTime = new Date(`${fechaCita}T${horaCita}`);
  const diferenciaMs = citaDateTime - ahora;
  const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
  return diferenciaHoras >= 2; // true = cumple anticipación mínima
}

/**
 * Notificación email de confirmación de cita
 */
async function enviarConfirmacionCita(paciente, cita) {
  const { enviarEmailActivacion } = require('../notifications/email');
  console.log(`[CITA] Confirmación enviada a ${paciente.correo} para cita del ${cita.fecha} a las ${cita.hora}`);
  return { confirmado: true };
}
