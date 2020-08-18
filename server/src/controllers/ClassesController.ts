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

		if (!filters.week_day || !filters.subject || !filters.time) {
			return res.status(400).json({
				error: 'Missing filters to search classes'
			})
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

		const trx = await db.transaction()

		try {
			
			const insertedClassesIds = await trx('classes').insert({
				subject,
				cost,
				account_id: req.params.id
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
