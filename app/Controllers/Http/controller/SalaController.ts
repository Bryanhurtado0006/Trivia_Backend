import SalaService from '#services/SalaService'

const salaService = new SalaService()

export default class SalaController {
  async crear({ request }) {
    const data = request.only(['codigo', 'nombre', 'jugadores', 'descripcion', 'moderador'])
    return salaService.crearSala({
      ...data,
      jugadores: Number(data.jugadores ?? 0),
    })
  }

  async listar() {
    return salaService.listarSalas()
  }

  async obtener({ params }) {
    const id = parseInt(params.id)
    return salaService.obtenerSala(id)
  }

  async actualizar({ params, request }) {
    const id = parseInt(params.id)
    const data = request.only(['codigo', 'nombre', 'descripcion', 'jugadores', 'estado'])
    return salaService.actualizarSala(id, {
      ...data,
      jugadores: data.jugadores ? Number(data.jugadores) : undefined,
    })
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return salaService.eliminarSala(id)
  }
}
