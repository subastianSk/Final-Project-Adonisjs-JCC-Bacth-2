import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OtpCode from 'App/Models/OtpCode'
import User from 'App/Models/User'
import LoginUserValidator from 'App/Validators/LoginUserValidator'
import OtpValidator from 'App/Validators/OtpValidator'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    try {
      const { email, password } = await request.validate(LoginUserValidator)
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1days',
      })
      response.ok({ message: 'Login success.', token })
    } catch (error) {
      if (error.guard) {
        response.badRequest({ message: 'Login failed.', error: error.message })
      } else {
        response.unprocessableEntity({
        message: "Login failed",
        error
      })
      }
    }
  }
  public async register({ request, response }: HttpContextContract) {
    // validate
    const data = await request.validate(RegisterUserValidator)
    const { name, email, password, role } = await request.validate(
      RegisterUserValidator
    )
    const newUser = await User.create({ name, email, password, role })
    // send otp
    const otp_code = Math.floor(100000 + Math.random() * 900000)
    await Mail.send((message) => {
      message
        .from('adonis.demo@sanberdev.com')
        .to(data.email)
        .subject('Verification Email')
        .htmlView('emails/otp_confirmation', { otp_code })
    })
    // save otp
    await OtpCode.create({ otp_code, user_id: newUser.id })
    // response
    response.created({
      message: 'Registered. Please verify your email.',
      data: newUser,
    })
  }
  public async otpConfirmation({ request, response }: HttpContextContract) {
    const { email, otp_code } = await request.validate(OtpValidator)
    const user = await User.findByOrFail('email', email)
    const otpCheck = await OtpCode.findBy('otp_code', otp_code)
    if (user?.id === otpCheck?.user_id) {
      user.is_verified = true
      await user?.save()
      return response.ok({ message: 'Email verified successfully.' })
    } else {
      return response.badRequest({ message: 'Email verification failed.' })
    }
  }
}
