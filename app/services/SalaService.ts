import Sala from '#models/sala'

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
}
