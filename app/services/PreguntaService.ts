import Pregunta from "#models/pregunta";

export default class PreguntaService {
  async crearPregunta(texto: string, respuesta_correcta: string, tiempo_limite: number, id_sala: number) {
    return Pregunta.create({ texto, respuesta_correcta, tiempo_limite, id_sala })
  }

  async listarPreguntas() {
    return Pregunta.all()
  }

  async obtenerPregunta(id: number) {
    return Pregunta.find(id)
  }

  async actualizarPregunta(id: number, data: Partial<{ texto: string; respuesta_correcta: string; tiempo_limite: number }>) {
    const pregunta = await Pregunta.findOrFail(id)
    pregunta.merge(data)
    await pregunta.save()
    return pregunta
  }

  async eliminarPregunta(id: number) {
    const pregunta = await Pregunta.findOrFail(id)
    await pregunta.delete()
    return { message: 'Pregunta eliminada' }
  }
}