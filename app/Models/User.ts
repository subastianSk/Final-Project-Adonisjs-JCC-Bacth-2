import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Venue from './Venue'
import Booking from './Booking'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public role: 'user' | 'owner'

  @column()
  public is_verified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Venue, {
    foreignKey: 'user_id',
  })
  public venues: HasMany<typeof Venue>

  @hasMany(() => Booking, {
    foreignKey: 'user_id',
  })
  public bookings: HasMany<typeof Booking>

  @manyToMany(() => Booking, {
    pivotTable: 'user_bookings',
  })
  public play_schedules: ManyToMany<typeof Booking>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
