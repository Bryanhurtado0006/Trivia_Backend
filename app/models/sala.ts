import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/orm'
import Pregunta from './Pregunta.ts'
import Jugadore from './jugadore.js'

export default class Sala extends BaseModel {
  public static table = 'salas'

  @column({ isPrimary: true, columnName: 'id_sala' })
  declare id_sala: number

  @column({columnName:'codigo'})
  declare codigo: string

  @column({columnName:'moderador'})
  declare moderador: string

  @column({columnName:'estado'})
  declare estado: 'activa' | 'cerrada'

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** 🔗 Relación con Preguntas */
  @hasMany(() => Pregunta, {
    foreignKey: 'id_sala',
  })
  declare preguntas: HasMany<typeof Pregunta>

  /*Relacin con jugadores */
  @hasMany(() => Jugadore, {
    foreignKey: 'id_sala',
  })
  declare jugadores: HasMany<typeof Jugadore>
}
