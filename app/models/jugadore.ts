import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/orm'

import Sala from './sala.ts'

export default class Jugadore extends BaseModel {

  public static table = 'jugadores'

   @column({ isPrimary: true, columnName: 'id_jugador' })
  declare id_jugador: number

  @column({columnName:'nickname'})
  declare nickname: string

  @column({columnName:'puntaje'})
  declare puntaje: number

  @column({columnName:'is_moderador'})
  declare is_moderador: boolean

  @column({columnName:'socket_id'})
  declare socket_id: string | null

  @column({ columnName: 'id_sala' })  
  declare id_sala: number
  
   @column({ columnName: 'user_id' })   
  declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  

  
  @belongsTo(() => Sala, {
    foreignKey: 'id_sala',
  })
  declare sala: BelongsTo<typeof Sala>
}