import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Jugadore from './jugadore.ts'
import Pregunta from './Pregunta.ts'

export default class Respuesta extends BaseModel {
  public static table = 'respuestas'
  @column({ isPrimary: true, columnName: 'id_respuestas' })
  declare id_respuestas: number

  @column({columnName:'respuesta'})
  declare respuesta: string

  @column({columnName:'es_correcta'})
  declare es_correcta: boolean

  @column({ columnName: 'id_jugador' })
  declare id_jugador: number

  @column({ columnName: 'id_preguntas' })
  declare id_preguntas: number

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** 🔗 Relación con Jugador */
  @belongsTo(() => Jugadore, {
    foreignKey: 'id_jugador',
  })
  declare jugador: BelongsTo<typeof Jugadore>

  /** 🔗 Relación con Pregunta */
  @belongsTo(() => Pregunta, {
    foreignKey: 'id_preguntas',
  })
  declare pregunta: BelongsTo<typeof Pregunta>
}