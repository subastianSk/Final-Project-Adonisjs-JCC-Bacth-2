import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    roles: string
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    let role = auth.user?.role || ''
    if (roles.includes(role)) await next()
    else response.forbidden({ message: 'You cannot access.' })
  }
}
