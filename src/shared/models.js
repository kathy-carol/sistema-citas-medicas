// Modelos compartidos — Sistema de Citas Médicas
class Paciente {
  constructor({ nombre, correo, telefono, documento }) {
    this.nombre = nombre;
    this.correo = correo;
    this.telefono = telefono;
    this.documento = documento;
    this.activo = false;
  }
}

class Medico {
  constructor({ nombre, especialidad, id }) {
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.id = id;
  }
}

class Cita {
  constructor({ pacienteId, medicoId, fecha, hora, especialidad }) {
    this.pacienteId = pacienteId;
    this.medicoId = medicoId;
    this.fecha = fecha;
    this.hora = hora;
    this.especialidad = especialidad;
    this.estado = 'Programada'; // Programada | Atendida | Cancelada | No asistió
  }
}

module.exports = { Paciente, Medico, Cita };
