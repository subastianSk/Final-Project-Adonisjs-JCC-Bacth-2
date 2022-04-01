import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Field from './Field'
import Booking from './Booking'

export default class Venue extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public phone: string

  @column()
  public user_id: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-MM-dd HH:mm:ss') : value
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime | null) => {
      return value ? value.toFormat('yyyy-MM-dd HH:mm:ss') : value
    },
  })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
    serializeAs: 'owner',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Field, {
    foreignKey: 'venue_id',
  })
  public fields: HasMany<typeof Field>

  @hasManyThrough([() => Booking, () => Field], {
    foreignKey: 'venue_id',
    throughForeignKey: 'field_id',
  })
  public bookings: HasManyThrough<typeof Booking>
}
