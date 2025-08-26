import Sala from "#models/sala";

export default class SalaService {
  // Crear una sala
  async crearSala(codigo: string, moderador: string) {
    const sala = await Sala.create({ codigo, moderador, estado: 'activa' })
    return sala
  }

  // Listar todas las salas
  async listarSalas() {
    return Sala.all()
  }

  // Obtener sala por ID
  async obtenerSala(id: number) {
    return Sala.find(id)
  }

  // Actualizar estado de la sala
  async actualizarSala(id: number, data: Partial<{ codigo: string; estado: 'activa' | 'cerrada' }>) {
    const sala = await Sala.findOrFail(id)
    sala.merge(data)
    await sala.save()
    return sala
  }

  // Eliminar sala
  async eliminarSala(id: number) {
    const sala = await Sala.findOrFail(id)
    await sala.delete()
    return { message: 'Sala eliminada' }
  }
}