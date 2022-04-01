import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OtpCodes extends BaseSchema {
  protected tableName = 'otp_codes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('otp_code')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

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
