// HU-05: Ver Agenda Diaria del Médico
// Sprint 4

async function obtenerAgendaDiaria(medicoId, fecha, db) {
  return db.query(
    "SELECT c.*, p.nombre as paciente FROM citas c JOIN pacientes p ON c.paciente_id = p.id WHERE c.medico_id = ? AND c.fecha = ? ORDER BY c.hora",
    [medicoId, fecha]
  );
}
module.exports = { obtenerAgendaDiaria };

async function filtrarAgendaPorFecha(medicoId, fecha, db) {
  return obtenerAgendaDiaria(medicoId, fecha, db);
}

async function actualizarEstadoCita(citaId, nuevoEstado, medicoId, db) {
  const estadosValidos = ['Atendida', 'No asistió'];
  if (!estadosValidos.includes(nuevoEstado)) throw new Error('Estado inválido');
  await db.query("UPDATE citas SET estado = ? WHERE id = ? AND medico_id = ?", [nuevoEstado, citaId, medicoId]);
  return { actualizado: true, estado: nuevoEstado };
}
module.exports = { obtenerAgendaDiaria, filtrarAgendaPorFecha, actualizarEstadoCita };
