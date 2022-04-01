/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login').as('auth.login')
  Route.post('/register', 'AuthController.register').as('auth.register')
  Route.post('/otp-confirmation', 'AuthController.otpConfirmation').as(
    'auth.otp.confirm'
  )
  // must login and verify email
  Route.group(() => {
    // owner
    Route.resource('venues', 'VenuesController')
      .apiOnly()
      .middleware({
        store: ['acl:owner'],
        update: ['acl:owner'],
        destroy: ['acl:owner'],
      })
    Route.resource('venues.fields', 'FieldsController')
      .apiOnly()
      .middleware({
        store: ['acl:owner'],
        update: ['acl:owner'],
        destroy: ['acl:owner'],
      })
    // user
    Route.group(() => {
      Route.post('/venues/:id/bookings', 'BookingsController.store').as(
        'bookings.store'
      )
      // only user created can delete
      Route.delete('/bookings/:id', 'BookingsController.destroy').as(
        'bookings.destroy'
      )
      Route.put('/bookings/:id/join', 'BookingsController.join').as(
        'bookings.join'
      )
      Route.put('/bookings/:id/unjoin', 'BookingsController.unjoin').as(
        'bookings.unjoin'
      )
    }).middleware(['acl:user'])
    // user and owner logged in
    Route.get('/bookings', 'BookingsController.index').as('bookings.index')
    Route.get('/bookings/:id', 'BookingsController.show').as('bookings.show')
    Route.get('/schedules', 'BookingsController.schedules').as(
      'bookings.schedules'
    )
  }).middleware(['auth', 'verify'])
}).prefix('/api/v1')
