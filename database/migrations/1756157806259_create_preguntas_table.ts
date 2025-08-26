import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'preguntas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
  table.increments('id_preguntas') // PK

  table.text('pregunta').notNullable() // pregunta
  table.string('tipo_pregunta').notNullable() // tipoPregunta: 'multiple' | 'verdadero_falso'
  
  table.string('respuesta_a').nullable()
  table.string('respuesta_b').nullable()
  table.string('respuesta_c').nullable()
  table.string('respuesta_d').nullable()

  table.string('respuesta_correcta').notNullable() // respuestaCorrecta
  table.string('verdadero_falso').nullable() // para preguntas tipo VF

  table.integer('tiempo_limite').notNullable() // duracion en segundos
table.integer('puntos').unsigned().defaultTo(1) // puntos que vale la pregunta

  table.string('imagen_url').nullable() // si decides guardar la imagen como URL

  table
    .integer('id_sala')
    .unsigned()
    .references('id_sala')
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