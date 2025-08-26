import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jugadores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_jugador') // PK
      table.string('nickname').notNullable() // nombre visible en la sala
      table.integer('puntaje').defaultTo(0) // puntaje acumulado

      // FK hacia users
      table
        .integer('user_id')
        .unsigned()
        .references('user_id')
        .inTable('usuarios')
        .onDelete('CASCADE')

      // FK hacia salas (jugador pertenece a una sala)
      table
        .integer('id_sala')
        .unsigned()
        .references('id_sala')
        .inTable('salas')
        .onDelete('CASCADE')

      // Opcionales para tiempo real
      table.boolean('is_moderador').defaultTo(false)
      table.string('socket_id').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}