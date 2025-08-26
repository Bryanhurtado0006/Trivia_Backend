import app from '@adonisjs/core/services/app'
import { Server } from 'socket.io'
import server from '@adonisjs/core/services/server'

interface JoinSalaPayload {
  codigoSala: string
  nickname: string
}

interface NewQuestionPayload {
  codigoSala: string
  pregunta: string
  opciones: string[]
}

interface AnswerPayload {
  codigoSala: string
  nickname: string
  respuesta: string
}

app.ready(() => {
  const io = new Server(server.getNodeServer(), {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado:', socket.id)

    // Almacenar nickname en socket para referencia futura
    socket.data.nickname = null
    socket.data.codigoSala = null

    socket.on('join_sala', (data: JoinSalaPayload) => {
      if (!data.codigoSala || !data.nickname) return

      socket.data.nickname = data.nickname
      socket.data.codigoSala = data.codigoSala
      socket.join(data.codigoSala)

      console.log(`👤 ${data.nickname} se une a la sala ${data.codigoSala}`)

      socket.to(data.codigoSala).emit('nuevo_jugador', {
        nickname: data.nickname,
        socketId: socket.id,
      })
    })

    socket.on('new_question', (data: NewQuestionPayload) => {
      if (!data.codigoSala || !data.pregunta || !data.opciones) return

      console.log(`📢 Pregunta enviada en sala ${data.codigoSala}`)

      io.to(data.codigoSala).emit('mostrar_pregunta', {
        pregunta: data.pregunta,
        opciones: data.opciones,
      })
    })

    socket.on('answer', (data: AnswerPayload) => {
      if (!data.codigoSala || !data.nickname || !data.respuesta) return

      console.log(`✅ ${data.nickname} respondió en sala ${data.codigoSala}`)

      io.to(data.codigoSala).emit('respuesta_jugador', {
        nickname: data.nickname,
        respuesta: data.respuesta,
      })
    })

    socket.on('disconnect', () => {
      const nickname = socket.data.nickname
      const sala = socket.data.codigoSala

      console.log(`🔴 Cliente desconectado: ${socket.id}`)

      if (sala && nickname) {
        socket.to(sala).emit('jugador_salio', {
          nickname,
          socketId: socket.id,
        })
      }
    })
  })
})
