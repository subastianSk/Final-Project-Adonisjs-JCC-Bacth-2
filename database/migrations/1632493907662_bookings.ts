import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Bookings extends BaseSchema {
  protected tableName = 'bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('play_date_start')
      table.dateTime('play_date_end')
      table.integer('total_players')
      table.integer('field_id').unsigned().references('id').inTable('fields')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.unique(['play_date_start', 'field_id'])
      table.unique(['play_date_end', 'field_id'])
      table.unique(['play_date_start', 'play_date_end', 'user_id', 'field_id'])

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
