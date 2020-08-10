import Knex from 'knex'

export async function up(knex: Knex) {
	return knex.schema.createTable('users', table => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('avatar').notNullable()
		table.string('whatsapp').notNullable()
		table.string('bio').notNullable()

		table.integer('login_id')
			.notNullable()
			.references('id')
			.inTable('logins')
			.onUpdate('CASCADE')
			.onDelete('CASCADE')
	})
}

export async function down(knex: Knex) {
	return knex.schema.dropTable('users')
}