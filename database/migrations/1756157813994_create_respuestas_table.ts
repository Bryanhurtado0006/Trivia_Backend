import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'respuestas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_respuestas') // PK
      table.string('respuesta').notNullable()
      table.boolean('es_correcta').defaultTo(false)

      // FK hacia jugador
      table
        .integer('id_jugador')
        .unsigned()
        .references('id_jugador') // coincide con la PK de jugadores
        .inTable('jugadores')
        .onDelete('CASCADE')

      // FK hacia pregunta
      table
        .integer('id_preguntas')
        .unsigned()
        .references('id_preguntas') // coincide con la PK de preguntas
        .inTable('preguntas')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}