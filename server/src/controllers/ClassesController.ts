import { Req, Res } from 'express'
import db from '../database/connection'
import convertHourToMinutes from '../utils/convertHourToMinutes'

interface ScheduleItem {
	week_day: number
	from: string
	to: string
}

export default class ClassesController {

	async index(req: Req, res: Res) {
		const filters = req.query

		async function paginatedResults(model:any) {

			const page = parseInt(req.query.page)
			const limit = parseInt(req.query.limit)

			const startIndex = ( page - 1 ) * limit
			const endIndex = page * limit

			const results = {
				next : {},
				previous: {},
				results: {},
				total: ''
			}

			if (endIndex < model.length) {

				results.next = {
					page: page + 1,
					limit
				}
			}

			if (startIndex > 0) {

				results.previous = {
					page: page - 1,
					limit
				}
			}

			try {

				results.results = await model
					.select('*')
					.from('classes')
					.join('accounts', 'classes.account_id', 'accounts.id' )
					.join('users', 'users.account_id', 'accounts.id')
					.limit(limit)
					.offset(startIndex)

				const allClasses = await model.select('*').from('classes')
				results.total = allClasses.length 

				return results
			} catch (err) {
				res.status(500).json({ message: err.message })
			}
		}

		if (!filters.week_day || !filters.subject || !filters.time) {

			const paginated = await paginatedResults(db)

			res.json(paginated)
		}

		const timeInMinutes = convertHourToMinutes(filters.time as string)
		
		const classes = await db('classes')
			.whereExists(function() {
				this.select('class_schedule.*')
					.from('class_schedule')
					.whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
					.whereRaw('`class_schedule`.`week_day` = ?? ', [Number(filters.week_day)])
					.whereRaw('`class_schedule`.`from` <= ?? ', [timeInMinutes])
					.whereRaw('`class_schedule`.`to` > ?? ', [timeInMinutes])
			})
			.where('classes.subject', '=', filters.subject as string)
			.join('users', 'classes.user_id', '=', 'users.id')
			.select(['classes.*', 'users.*'])
			
		return res.json(classes)

	}

	async create(req: Req, res: Res) {
		const { subject, cost, schedule } = req.body
		const { id } = req.params

		const trx = await db.transaction()

		try {
			
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				account_id: id
			})

			const class_id = insertedClassesIds[0]

			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to)
				}
			})

			await trx('class_schedule').insert(classSchedule)

			await trx.commit()

			return res.status(201).send('Class successfuly created')

		} catch(e) {

			trx.rollback()

			return res.status(400).json({
				error: 'Unexpected error while creating new class'
			})
		}
	}
}
