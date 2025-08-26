import RespuestaService from '#services/RespuestaService'

const respuestaService = new RespuestaService()

export default class RespuestaController {

  /** Crear una nueva respuesta */
  async crear({ request }) {
    const { id_jugador, id_preguntas, respuesta, es_correcta } = request.all()
    return respuestaService.crearRespuesta(id_jugador, id_preguntas, respuesta, es_correcta)
  }

  /** Listar todas las respuestas */
  async listar() {
    return respuestaService.listarRespuestas()
  }

  /** Obtener una respuesta por ID */
  async obtener({ params }) {
    const id = parseInt(params.id)
    return respuestaService.obtenerRespuesta(id)
  }

  /** Actualizar una respuesta */
  async actualizar({ params, request }) {
    const id = parseInt(params.id)
    const data = request.only(['respuesta', 'es_correcta'])
    return respuestaService.actualizarRespuesta(id, data)
  }

  /** Eliminar una respuesta */
  async eliminar({ params }) {
    const id = parseInt(params.id)
    return respuestaService.eliminarRespuesta(id)
  }
}
