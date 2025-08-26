import Pregunta from '#models/pregunta'

export default class PreguntaService {
  async crearPregunta(data: {
    pregunta: string
    tipo_pregunta: string
    respuesta_a?: string
    respuesta_b?: string
    respuesta_c?: string
    respuesta_d?: string
    respuesta_correcta: string
    verdadero_falso?: string
    tiempo_limite: number
    puntos?: number
    imagen_url?: string
    id_sala: number
  }) {
    return Pregunta.create({
      pregunta: data.pregunta,
      tipoPregunta: data.tipo_pregunta,
      respuestaA: data.respuesta_a,
      respuestaB: data.respuesta_b,
      respuestaC: data.respuesta_c,
      respuestaD: data.respuesta_d,
      respuestaCorrecta: data.respuesta_correcta,
      verdaderoFalso: data.verdadero_falso,
      tiempoLimite: data.tiempo_limite,
      puntos: data.puntos,
      imagenUrl: data.imagen_url,
      id_sala: data.id_sala,
    })
  }

  async listarPreguntas() {
    return Pregunta.query().preload('sala')
  }

  async obtenerPregunta(id: number) {
    return Pregunta.query().where('id', id).preload('sala').firstOrFail()
  }

  async actualizarPregunta(id: number, data: Partial<Pregunta>) {
    const pregunta = await Pregunta.findOrFail(id)
    pregunta.merge(data)
    await pregunta.save()
    return pregunta
  }

  async eliminarPregunta(id: number) {
    const pregunta = await Pregunta.findOrFail(id)
    await pregunta.delete()
    return { message: 'Pregunta eliminada correctamente' }
  }
}
