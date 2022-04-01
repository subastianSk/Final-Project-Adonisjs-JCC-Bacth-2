import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Venue from 'App/Models/Venue'
import CreateVenueValidator from 'App/Validators/CreateVenueValidator'
import UpdateVenueValidator from 'App/Validators/UpdateVenueValidator'

export default class VenuesController {
  private serializeField = (venue) => {
    return venue.serialize({
      fields: { omit: ['user_id'] },
      relations: {
        owner: { fields: ['id', 'name', 'email'] },
        fields: { fields: { omit: ['created_at', 'updated_at', 'venue_id'] } },
        bookings: {
          fields: { omit: ['created_at', 'updated_at', 'user_id_booking'] },
          relations: { user_booking: { fields: ['id', 'name', 'email'] } },
        },
      },
    })
  }

  public async index({ request, response }: HttpContextContract) {
    const { name, address, phone, type } = request.qs()
    const venues = await Venue.query()
      .where('name', 'like', `%${name || ''}%`)
      .where('address', 'like', `%${address || ''}%`)
      .where('phone', 'like', `%${phone || ''}%`)
      .preload('user')
      .preload('fields', (fields) => {
        fields.where('type', 'like', `%${type || ''}%`)
      })
    const venuesJSON = venues
      .map((v) => this.serializeField(v))
      .filter((venue) => (type ? venue.fields.length > 0 : venue))
    response.ok({ message: 'Success.', data: venuesJSON })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const { name, address, phone } = await request.validate(
      CreateVenueValidator
    )
    const user = await User.findOrFail(auth.user?.id)
    const newVenue = await user?.related('venues').create({
      name,
      address,
      phone,
    })
    response.created({ message: 'Created.', data: newVenue })
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { id } = params
    const { date } = request.qs()
    const currentDate = new Date().toLocaleDateString().split('/')
    const now = [currentDate[2], currentDate[0], currentDate[1]].join('-')

    const venue = await Venue.query()
      .where('id', id)
      .preload('user')
      .preload('fields')
      .preload('bookings', (booking) => {
        booking
          .whereBetween('play_date_start', [
            `${date || now} 00:00`,
            `${date || now} 23:59`,
          ])
          .preload('user')
      })
      .firstOrFail()
    const venueJSON = this.serializeField(venue)

    response.ok({ message: 'Success.', data: venueJSON })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { name, address, phone } = await request.validate(
      UpdateVenueValidator
    )
    const { id } = params
    const venue = await Venue.findOrFail(id)
    await venue.merge({ name, address, phone }).save()
    response.ok({ message: 'Updated', data: venue })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params
    const venue = await Venue.findOrFail(id)
    await venue.delete()
    response.ok({ message: 'Deleted', data: venue })
  }
}
