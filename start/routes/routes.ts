import Route from '@adonisjs/core/services/router'

import UsuarioController from '../../app/Controllers/Http/controller/UsuarioController.js'
import SalaController from '../../app/Controllers/Http/controller/SalaController.js'
import JugadorController from '../../app/Controllers/Http/controller/JugadorController.js'
import PreguntaController from '../../app/Controllers/Http/controller/PreguntaController.js'
import RespuestaController from '../../app/Controllers/Http/controller/RespuestaController.js'

const usuarioController = new UsuarioController()
const salaController = new SalaController()
const jugadorController = new JugadorController()
const preguntaController = new PreguntaController()
const respuestaController = new RespuestaController()

//usuarios 
Route.post('/usuarios', usuarioController.crear)
Route.put('/usuarios/:id', usuarioController.actualizar)
Route.delete('/usuarios/:id', usuarioController.eliminar)
Route.get('/usuarios', usuarioController.listar)
Route.get('/usuarios/:id', usuarioController.obtener)

//salaas
Route.post('/salas', salaController.crear)
Route.put('/salas/:id', salaController.actualizar)
Route.delete('/salas/:id', salaController.eliminar)
Route.get('/salas', salaController.listar)
Route.get('/salas/:id', salaController.obtener)

//jugadores
Route.post('/jugadores', jugadorController.crear)
Route.put('/jugadores/:id', jugadorController.actualizar)
Route.delete('/jugadores/:id', jugadorController.eliminar)
Route.get('/jugadores', jugadorController.listar)
Route.get('/jugadores/:id', jugadorController.obtener)

//Preguntas
Route.post('/preguntas', preguntaController.crear)
Route.put('/preguntas/:id', preguntaController.actualizar)
Route.delete('/preguntas/:id', preguntaController.eliminar)
Route.get('/preguntas', preguntaController.listar)
Route.get('/preguntas/:id', preguntaController.obtener)


//Respuestas
Route.post('/respuestas', respuestaController.crear)
Route.put('/respuestas/:id', respuestaController.actualizar)
Route.delete('/respuestas/:id', respuestaController.eliminar)
Route.get('/respuestas', respuestaController.listar)
Route.get('/respuestas/:id', respuestaController.obtener)
