import PreguntaService from '#services/PreguntaService'

const preguntaService = new PreguntaService()

export default class PreguntaController {
  async crear({ request }) {
    const data = request.only([
      'pregunta',
      'tipo_pregunta',
      'respuesta_a',
      'respuesta_b',
      'respuesta_c',
      'respuesta_d',
      'respuesta_correcta',
      'verdadero_falso',
      'tiempo_limite',
      'puntos',
      'imagen_url',
      'id_sala',
    ])

    return preguntaService.crearPregunta({
      ...data,
      tiempo_limite: Number(data.tiempo_limite),
      id_sala: Number(data.id_sala),
    })
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
    const data = request.only([
      'pregunta',
      'tipo_pregunta',
      'respuesta_a',
      'respuesta_b',
      'respuesta_c',
      'respuesta_d',
      'respuesta_correcta',
      'verdadero_falso',
      'tiempo_limite',
      'puntos',
      
      'imagen_url',
      'id_sala',
    ])
    return preguntaService.actualizarPregunta(id, data)
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return preguntaService.eliminarPregunta(id)
  }
}
