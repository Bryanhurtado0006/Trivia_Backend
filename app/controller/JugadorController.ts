import JugadorService from "#services/JugadorService";

const jugadorService = new JugadorService() // constante global

export default class JugadorController {
  async crear({ request }) {
    const { nickname, id_sala, is_moderador, socket_id } = request.all()
    return jugadorService.crearJugador(nickname, id_sala, is_moderador, socket_id)
  }

  async listar() {
    return jugadorService.listarJugadores()
  }

  async obtener({ params }) {
    const id = parseInt(params.id)
    return jugadorService.obtenerJugador(id)
  }

  async actualizar({ params, request }) {
    const id = parseInt(params.id)
    const data = request.only(['nickname', 'puntaje', 'is_moderador', 'socket_id'])
    return jugadorService.actualizarJugador(id, data)
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return jugadorService.eliminarJugador(id)
  }
}