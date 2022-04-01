import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Verify {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let isVerified = auth.user?.is_verified
    if (isVerified) await next()
    else response.unauthorized({ message: 'Email not verified yet.' })
  }
}
