import { io } from "socket.io-client"

const socket = io("http://localhost:3333", {
  transports: ["websocket"]
})

socket.on("connect", () => {
  console.log("🟢 Conectado al servidor:", socket.id)

  // Unirse a sala
  socket.emit("join_sala", { codigoSala: "AB12", nickname: "Jugador1" })

  // Enviar respuesta después de 2 segundos
  setTimeout(() => {
    socket.emit("answer", { codigoSala: "AB12", nickname: "Jugador1", respuesta: "A" })
  }, 2000)
})

socket.on("nuevo_jugador", (data) => console.log("👤 Nuevo jugador:", data))
socket.on("mostrar_pregunta", (data) => console.log("📢 Pregunta recibida:", data))
socket.on("respuesta_jugador", (data) => console.log("✅ Respuesta recibida:", data))
socket.on("jugador_salio", (data) => console.log("❌ Jugador salió:", data))
