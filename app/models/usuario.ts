import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import type { hasOne, BelongsTo } from '@adonisjs/lucid/orm'
import Jugadore from './jugadore.ts'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true,columnName: 'user_id' })
  declare user_id: number

  @column({columnName: 'email'})
  declare email: string

  @column({columnName: 'password'})
  declare password: string

  @column({columnName: 'rol'})
  declare rol: 'moderador' | 'jugador'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Jugadore, {
    foreignKey: 'user_id',
  })
  declare jugador: HasOne<typeof Jugadore>
}