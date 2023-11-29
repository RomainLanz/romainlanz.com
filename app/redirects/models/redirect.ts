import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UUID } from '#types/common'

export default class Redirect extends BaseModel {
  @column({ isPrimary: true })
  declare id: UUID

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare url: string

  @column()
  declare to: string
}
