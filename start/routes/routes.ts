import Route from '@adonisjs/core/services/router'
import UsuarioController from '../../app/controller/UsuarioController.ts'
import SalaController from '../../app/controller/SalaController.ts'
import JugadorController from '../../app/controller/JugadorController.ts'
import PreguntaController from '../../app/controller/PreguntaController.ts'
import RespuestaController from '../../app/controller/RespuestaController.ts'



const usuarioController = new UsuarioController()
const salaController = new SalaController()
const jugadorController = new JugadorController()
const preguntaController = new PreguntaController()
const respuestaController = new RespuestaController()


Route.post('/usuarios', usuarioController.crear)
Route.get('/usuarios', usuarioController.listar)
Route.get('/usuarios/:id', usuarioController.obtener)
Route.put('/usuarios/:id', usuarioController.actualizar)
Route.delete('/usuarios/:id', usuarioController.eliminar)

//sala 

Route.post('/salas', salaController.crear)
Route.get('/salas', salaController.listar)
Route.get('/salas/:id', salaController.obtener)
Route.put('/salas/:id', salaController.actualizar)
Route.delete('/salas/:id', salaController.eliminar)

//jugador 

Route.post('/jugadores', jugadorController.crear)
Route.get('/jugadores', jugadorController.listar)
Route.get('/jugadores/:id', jugadorController.obtener)
Route.put('/jugadores/:id', jugadorController.actualizar)
Route.delete('/jugadores/:id', jugadorController.eliminar)

//preguntas 
Route.post('/preguntas', preguntaController.crear)
Route.get('/preguntas', preguntaController.listar)
Route.get('/preguntas/:id', preguntaController.obtener)
Route.put('/preguntas/:id', preguntaController.actualizar)
Route.delete('/preguntas/:id', preguntaController.eliminar)

//respuesta 

Route.post('/respuestas', respuestaController.crear)
Route.get('/respuestas', respuestaController.listar)
Route.get('/respuestas/:id', respuestaController.obtener)
Route.put('/respuestas/:id', respuestaController.actualizar)
Route.delete('/respuestas/:id', respuestaController.eliminar)

