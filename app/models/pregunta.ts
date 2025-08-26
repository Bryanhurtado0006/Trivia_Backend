import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/orm'
import Sala from './sala.ts'
import Respuesta from './respuesta.ts'


export default class Pregunta extends BaseModel {
  public static table = 'preguntas'

  @column({ isPrimary: true, columnName: 'id_preguntas' })
  declare id_preguntas: number

  @column({columnName:'pregunta'})
  declare pregunta: string

  @column({ columnName: 'tipo_pregunta' })
  declare tipoPregunta: string

  @column({ columnName: 'respuesta_a' })
  declare respuestaA: string | null

  @column({ columnName: 'respuesta_b' })
  declare respuestaB: string | null

  @column({ columnName: 'respuesta_c' })
  declare respuestaC: string | null

  @column({ columnName: 'respuesta_d' })
  declare respuestaD: string | null

  @column({ columnName: 'respuesta_correcta' })
  declare respuestaCorrecta: string

  @column({ columnName: 'verdadero_falso' })
  declare verdaderoFalso: string | null

  @column({ columnName: 'tiempo_limite' })
  declare tiempoLimite: number

  @column({ columnName: 'puntos' })
  declare puntos: number


  @column({ columnName: 'imagen_url' })
  declare imagenUrl: string | null

  @column({ columnName: 'id_sala' })
  declare id_sala: number




  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** 🔗 Relación con Sala */
  @belongsTo(() => Sala, {
    foreignKey: 'id_sala',
  })
  declare sala: BelongsTo<typeof Sala>

  /** 🔗 Relación con Respuestas */
  @hasMany(() => Respuesta, {
    foreignKey: 'pregunta_id',
  })
  declare respuestas: HasMany<typeof Respuesta>
}