# Sistema de Citas Médicas

Control de Versiones y Branching con Git — Git Flow Adaptado
Estrategia: Kanban + Scrum | Shift Left & Shift Right Testing

## Historias de Usuario
- HU-01: Registro de Paciente (Sprint 1)
- HU-02: Inicio de Sesión (Sprint 1)
- HU-03: Agendar Cita Médica (Sprint 2)
- HU-04: Cancelar o Reprogramar Cita (Sprint 3)
- HU-05: Ver Agenda Diaria del Médico (Sprint 4)

## Estructura de Ramas
- `main`: Código en producción estable
- `develop`: Integración continua de features
- `feature/sprint{N}-HU-{ID}`: Feature por Historia de Usuario
- `bugfix/BUG-{ID}-{descripcion}`: Corrección de bugs
- `hotfix/BUG-{ID}-{descripcion}`: Corrección crítica en producción
- `release/sprint{N}`: Release por Sprint

## Versiones
| Tag | Sprint | HUs Incluidas |
|-----|--------|---------------|
| v1.0.0-sprint1 | Sprint 1 | HU-01 + HU-02 |
| v1.1.0-sprint2 | Sprint 2 | HU-01..03 |
| v1.2.0-sprint3 | Sprint 3 | HU-01..04 |
| v2.0.0 | Sprint 4 | HU-01..05 |
