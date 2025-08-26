import UsuarioService from '../../../services/UsuarioService.js'

const usuarioService = new UsuarioService() 

export default class UsuarioController {
  async crear({ request }) {
    const { email, password, rol } = request.all()
    return usuarioService.crearUsuario(email, password, rol)
  }

  async listar() {
    return usuarioService.listarUsuarios()
  }

  async obtener({ params }) {
    const id = parseInt(params.id)
    return usuarioService.obtenerUsuario(id)
  }

  async actualizar({ params, request }) {
    const id = parseInt(params.id)
    const data = request.only(['email', 'password', 'rol'])
    return usuarioService.actualizarUsuario(id, data)
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return usuarioService.eliminarUsuario(id)
  }
}
