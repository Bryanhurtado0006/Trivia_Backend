import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

// Cuando la app termina de arrancar, iniciamos el servidor de WS
app.ready(() => {
  // Crear el servicio WebSocket sobre el mismo HTTP server de Adonis
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*', // Permite cualquier origen (para desarrollo, en prod pon tu dominio)
    },
  })

  // Escuchamos cuando un cliente se conecta
  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id) // ⚠️ aquí tenías una comilla de más

    /**
     * Evento: jugador se une a una sala
     * - El cliente envía { codigoSala, nickname }
     * - Lo unimos a esa sala y notificamos a los demás jugadores
     */
    socket.on('join_sala', (data) => {
      console.log(`👤 ${data.nickname} se une a la sala ${data.codigoSala}`)

      // Unimos al jugador a la sala
      socket.join(data.codigoSala)

      // Notificamos a los demás jugadores de la sala
      socket.to(data.codigoSala).emit('nuevo_jugador', {
        nickname: data.nickname,
      })
    })

    /**
     * Evento: moderador envía una nueva pregunta
     * - El moderador emite { codigoSala, pregunta, opciones }
     * - Todos los jugadores de esa sala reciben el evento 'mostrar_pregunta'
     */
    socket.on('new_question', (data) => {
      console.log(`📢 Nueva pregunta en sala ${data.codigoSala}`)
      io.to(data.codigoSala).emit('mostrar_pregunta', {
        pregunta: data.pregunta,
        opciones: data.opciones,
      })
    })

    /**
     * Evento: jugador envía respuesta
     * - El jugador emite { codigoSala, nickname, respuesta }
     * - Se notifica a todos los jugadores (o solo al moderador, según lógica)
     */
    socket.on('answer', (data) => {
      console.log(`✅ ${data.nickname} respondió en sala ${data.codigoSala}`)

      io.to(data.codigoSala).emit('respuesta_jugador', {
        nickname: data.nickname,
        respuesta: data.respuesta,
      })
    })

    /**
     * Evento: jugador se desconecta
     * - Cuando un cliente cierra sesión o se va
     */
    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado:', socket.id)
    })
  })
})
