import Sala from '#models/sala'
import Jugadore from '#models/jugadore'


export default class SalaService {
  // Crear una sala
  async crearSala(data: {
    codigo: string
    nombre: string
    jugadores?: number
    descripcion?: string
    moderador: string
  }) {
    return Sala.create({
      codigo: data.codigo,
      nombre: data.nombre,
      jugadores: data.jugadores ?? 0,
      descripcion: data.descripcion ?? null,
      moderador: data.moderador,
      estado: 'activa',
    })
  }

  // Listar todas las salas
  async listarSalas() {
    return Sala.query().preload('preguntas').preload('jugadoresRelacion')
  }

  // Obtener sala por ID
  async obtenerSala(id: number) {
    return Sala.query()
      .where('id', id)
      .preload('preguntas')
      .preload('jugadoresRelacion')
      .firstOrFail()
  }

  // Actualizar sala
  async actualizarSala(
    id: number,
    data: Partial<{
      codigo: string
      nombre: string
      descripcion: string
      jugadores: number
      estado: 'activa' | 'cerrada'
    }>
  ) {
    const sala = await Sala.findOrFail(id)
    sala.merge(data)
    await sala.save()
    return sala
  }

  // Eliminar sala
  async eliminarSala(id: number) {
    const sala = await Sala.findOrFail(id)
    await sala.delete()
    return { message: 'Sala eliminada correctamente' }
  }

  // 🚀 Unirse a una sala
  async unirseASala(codigo: string, nickname: string, socket_id?: string, is_moderador: boolean = false) {
    // Buscar sala
    const sala = await Sala.findBy('codigo', codigo)
    if (!sala) {
      throw new Error('❌ Sala no encontrada')
    }

    // Validar estado
    if (sala.estado !== 'activa') {
      throw new Error('❌ La sala no está disponible')
    }

    // (Opcional) validar límite de jugadores
    // if (sala.jugadores >= 10) throw new Error('❌ Sala llena')

    // Crear jugador
    const jugador = await Jugadore.create({
      nickname,
      id_sala: sala.id_sala,
      is_moderador,
      socket_id: socket_id ?? null,
    })

    // Actualizar contador de jugadores
    sala.jugadores = (sala.jugadores ?? 0) + 1
    await sala.save()

    return {
      message: `👤 ${nickname} se unió a la sala ${sala.codigo}`,
      sala,
      jugador,
    }
  }
}
