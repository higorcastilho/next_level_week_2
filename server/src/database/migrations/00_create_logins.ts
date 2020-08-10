import Knex from 'knex'

export async function up(knex: Knex) {
	return knex.schema.createTable('logins', table => {
		table.increments('id').primary()
		table.string('email').notNullable()
		table.string('password').notNullable()

	})
}

export async function down(knex: Knex) {
	return knex.schema.dropTable('logins')
}