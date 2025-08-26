import Respuesta from "#models/respuesta";

export default class RespuestaService {

  /** Crear una respuesta */
  async crearRespuesta(
    id_jugador: number,
    id_preguntas: number,
    respuesta: string,
    es_correcta = false
  ) {
    const nuevaRespuesta = await Respuesta.create({
      id_jugador,
      id_preguntas,
      respuesta,
      es_correcta,
    })
    return nuevaRespuesta
  }

  /** Listar todas las respuestas */
  async listarRespuestas() {
    return Respuesta.all()
  }

  /** Obtener respuesta por ID */
  async obtenerRespuesta(id: number) {
    return Respuesta.find(id)
  }

  /** Actualizar una respuesta */
  async actualizarRespuesta(
    id: number,
    data: Partial<{ respuesta: string; es_correcta: boolean }>
  ) {
    const resp = await Respuesta.findOrFail(id)
    resp.merge(data)
    await resp.save()
    return resp
  }

  /** Eliminar respuesta */
  async eliminarRespuesta(id: number) {
    const resp = await Respuesta.findOrFail(id)
    await resp.delete()
    return { message: 'Respuesta eliminada' }
  }
}