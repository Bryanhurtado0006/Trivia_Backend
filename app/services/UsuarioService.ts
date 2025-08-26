import Usuario from "#models/usuario"

export default class UsuarioService {
  // Crear un nuevo usuario
  async crearUsuario(email: string, password: string, rol: 'moderador' | 'jugador') {
    const usuario = await Usuario.create({ email, password, rol })
    return usuario
  }

  // Obtener todos los usuarios
  async listarUsuarios() {
    return Usuario.all()
  }

  // Buscar usuario por ID
  async obtenerUsuario(id: number) {
    return Usuario.find(id)
  }

  // Actualizar usuario
  async actualizarUsuario(id: number, data: Partial<{ email: string; password: string; rol: string }>) {
    const usuario = await Usuario.findOrFail(id)
    usuario.merge(data)
    await usuario.save()
    return usuario
  }

  // Eliminar usuario
  async eliminarUsuario(id: number) {
    const usuario = await Usuario.findOrFail(id)
    await usuario.delete()
    return { message: 'Usuario eliminado' }
  }
}
