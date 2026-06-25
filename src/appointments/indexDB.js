// BUG-007 HOTFIX: Optimizar índices BD para latencia en horas pico
// Detectado en: Monitoreo Producción (Shift Right) | Severidad: Media/P2
// Migración: CREATE INDEX idx_horarios_fecha ON horarios(fecha, medico_id, disponible);
//            CREATE INDEX idx_citas_fecha ON citas(fecha, medico_id, estado);
module.exports = { migrations: ['idx_horarios_fecha', 'idx_citas_fecha'] };
