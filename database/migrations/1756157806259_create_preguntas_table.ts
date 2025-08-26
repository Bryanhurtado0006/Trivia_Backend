import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'preguntas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_preguntas') // PK
      table.text('texto').notNullable() // Texto de la pregunta
      table.string('respuesta_correcta').notNullable() // Respuesta correcta
      table.integer('tiempo_limite').notNullable() // en segundos

      // FK hacia sala
      table
        .integer('id_sala')
        .unsigned()
        .references('id_sala') // coincide con la PK de salas
        .inTable('salas')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}