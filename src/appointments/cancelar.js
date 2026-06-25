// HU-04: Cancelar o Reprogramar Cita
// Sprint 3

async function obtenerCitasActivasPaciente(pacienteId, db) {
  return db.query(
    "SELECT * FROM citas WHERE paciente_id = ? AND estado = 'Programada' ORDER BY fecha, hora",
    [pacienteId]
  );
}
module.exports = { obtenerCitasActivasPaciente };

async function cancelarCita(citaId, pacienteId, db) {
  await db.query("UPDATE citas SET estado = 'Cancelada' WHERE id = ? AND paciente_id = ?", [citaId, pacienteId]);
  return { cancelada: true, citaId };
}

async function reprogramarCita(citaId, nuevaFecha, nuevaHora, pacienteId, db) {
  await db.query("UPDATE citas SET fecha = ?, hora = ? WHERE id = ? AND paciente_id = ?",
    [nuevaFecha, nuevaHora, citaId, pacienteId]);
  return { reprogramada: true };
}

function validarRestriccionTiempo(cita) {
  const ahora = new Date();
  const citaDateTime = new Date(`${cita.fecha}T${cita.hora}`);
  return (citaDateTime - ahora) >= 3 * 60 * 60 * 1000; // 3 horas mínimo
}

async function notificarMedicoCambio(medicoId, tipo, cita) {
  const { notificarMedico } = require('../notifications/email');
  return notificarMedico(medicoId, tipo, cita);
}
module.exports = { obtenerCitasActivasPaciente, cancelarCita, reprogramarCita, validarRestriccionTiempo, notificarMedicoCambio };
