import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Venue from './Venue'
import Booking from './Booking'

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: 'soccer' | 'minisoccer' | 'futsal' | 'basketball' | 'volleyball'

  @column()
  public venue_id: number

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

  @belongsTo(() => Venue, {
    foreignKey: 'venue_id',
  })
  public venue: BelongsTo<typeof Venue>

  @hasMany(() => Booking, {
    foreignKey: 'field_id',
  })
  public bookings: HasMany<typeof Booking>
}
