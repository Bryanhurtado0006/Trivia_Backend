import SalaService from "#services/SalaService"


const salaService = new SalaService() // constante global

export default class SalaController {
  async crear({ request }) {
    const { codigo, moderador } = request.all()
    return salaService.crearSala(codigo, moderador)
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
    const data = request.only(['codigo', 'estado'])
    return salaService.actualizarSala(id, data)
  }

  async eliminar({ params }) {
    const id = parseInt(params.id)
    return salaService.eliminarSala(id)
  }
}
