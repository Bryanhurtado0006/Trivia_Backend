import PreguntaService from "#services/PreguntaService";

const preguntaService = new PreguntaService()

export default class PreguntaController {
  async crear({ request }) {
    const { texto, respuesta_correcta, tiempo_limite, id_sala } = request.all()
    return preguntaService.crearPregunta(texto, respuesta_correcta, tiempo_limite, id_sala)
  }

  async listar() {
    return preguntaService.listarPreguntas()
  }

  async obtener({ params }) {
    const id = parseInt(params.id)
    return preguntaService.obtenerPregunta(id)
  }

  async actualizar({ params, request }) {
    const id = parseInt(params.id)
    const data = request.only(['texto', 'respuesta_correcta', 'tiempo_limite'])
    return preguntaService.actualizarPregunta(id, data)
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return preguntaService.eliminarPregunta(id)
  }
}
