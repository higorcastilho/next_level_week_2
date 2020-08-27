import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
	week_day: number
	from: string
	to: string
}

interface DataProps {
	model: any
	startIndex: number
	limit: number
	week_day: any
	timeInMinutes: any
	subject: string
}

const paginatedResults = async ( limit, startIndex ) => {

		return await db
			.select('*')
			.from('classes')
			.join('accounts', 'classes.account_id', 'accounts.id' )
			.join('users', 'users.account_id', 'accounts.id')
			.limit(limit)
			.offset(startIndex)
}

const numOfClasses = async () => await db.select('*').from('classes')

const classesFilter = async (week_day, timeInMinutes, subject) => {
	return await db('classes')
		.whereExists(function() {
			this.select('class_schedule.*')
				.from('class_schedule')
				.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
				.whereRaw('`class_schedule`.`week_day` = ?? ', [Number(week_day)])
				.whereRaw('`class_schedule`.`from` <= ?? ', [timeInMinutes])
				.whereRaw('`class_schedule`.`to` > ?? ', [timeInMinutes])
		})
		.where('classes.subject', '=', subject)
		.join('users', 'classes.user_id', '=', 'users.id')
		.select(['classes.*', 'users.*'])
}

const createClasses = async (subject, cost, accountId) => {

	return await db('classes').insert({
		subject,
		cost,
		account_id: accountId
	})
}

const createClassSchedule = async (classSchedule) => {
	await db('class_schedule').insert(classSchedule)
}

module.exports = {
	paginatedResults,
	numOfClasses,
	classesFilter,
	createClasses,
	createClassSchedule	
}
