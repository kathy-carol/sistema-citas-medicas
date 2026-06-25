// BUG-004 FIX: Liberar horario original en BD al reprogramar
// Detectado en: QA Paso 4 | Severidad: Alta/P1

async function liberarHorarioOriginal(citaId, db) {
  const transaction = await db.beginTransaction();
  try {
    const cita = await db.query('SELECT medico_id, fecha, hora FROM citas WHERE id = ?', [citaId], {transaction});
    await db.query("UPDATE horarios SET disponible = true WHERE medico_id = ? AND fecha = ? AND hora = ?",
      [cita[0].medico_id, cita[0].fecha, cita[0].hora], {transaction});
    await db.commit(transaction);
    return { liberado: true };
  } catch (err) {
    await db.rollback(transaction);
    throw err;
  }
}
module.exports = { liberarHorarioOriginal };
