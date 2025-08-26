import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_sala') // PK autoincremental
      table.string('codigo', 10).notNullable().unique() // Código corto ej: AB12
      table.string('nombre').notNullable() // Nombre de la sala
      table.integer('jugadores').unsigned().defaultTo(0) // Número de jugadores esperados o conectados
      table.text('descripcion').nullable() // Descripción opcional

      table.string('moderador').notNullable() // Nickname del moderador
      table.enum('estado', ['activa', 'cerrada']).defaultTo('activa') // Estado de la sala

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}