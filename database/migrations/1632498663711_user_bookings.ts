import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserBookings extends BaseSchema {
  protected tableName = 'user_bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
      table.unique(['user_id', 'booking_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true,true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
