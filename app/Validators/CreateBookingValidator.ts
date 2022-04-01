import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBookingValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id,
  })
  public schema = schema.create({
    field_id: schema.number(),
    play_date_start: schema.date(
      {
        format: 'yyyy-MM-dd HH:mm:ss',
      },
      [
        rules.after('today'),
        // rules.unique({
        //   table: 'bookings',
        //   column: 'play_date_start',
        //   where: { user_id: this.refs.user_id },
        // }),
      ]
    ),
    play_date_end: schema.date.optional(
      {
        format: 'yyyy-MM-dd HH:mm:ss',
      },
      [
        rules.after('today'),
        rules.afterField('play_date_start'),
        // rules.unique({
        //   table: 'bookings',
        //   column: 'play_date_end',
        //   where: { user_id: this.refs.user_id },
        // }),
      ]
    ),
    total_players: schema.number([rules.range(2, 100)]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'play_date_start.unique': 'Already booked.',
    'play_date_end.unique': 'Already booked.',
  }
}
