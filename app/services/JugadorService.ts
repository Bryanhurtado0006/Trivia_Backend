import Jugadore from "#models/jugadore"

export default class JugadorService {
  async crearJugador(nickname: string, id_sala: number, is_moderador = false, socket_id: string | null = null) {
    const jugador = await Jugadore.create({ nickname, id_sala, is_moderador, socket_id, puntaje: 0 })
    return jugador
  }

  async listarJugadores() {
    return Jugadore.all()
  }

  async obtenerJugador(id: number) {
    return Jugadore.find(id)
  }

  async actualizarJugador(id: number, data: Partial<{ nickname: string; puntaje: number; is_moderador: boolean; socket_id: string }>) {
    const jugador = await Jugadore.findOrFail(id)
    jugador.merge(data)
    await jugador.save()
    return jugador
  }

  async eliminarJugador(id: number) {
    const jugador = await Jugadore.findOrFail(id)
    await jugador.delete()
    return { message: 'Jugador eliminado' }
  }
}
