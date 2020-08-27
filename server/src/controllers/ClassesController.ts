import { Req, Res } from 'express'
import convertHourToMinutes from '../utils/convertHourToMinutes'

const ClassesRepository = require('../repositories/classesRepository')

interface ScheduleItem {
	week_day: number
	from: string
	to: string
}

export default class ClassesController {

	async index(req: Req, res: Res) {
		const filters = req.query

		async function paginatedResults() {

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

			if (endIndex < 10/*model.length*/) {

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

				results.results = await ClassesRepository.paginatedResults(limit, startIndex)

				const allClasses = await ClassesRepository.numOfClasses()
				results.total = allClasses.length 

				return results
			} catch (err) {
				res.status(500).json({ message: err.message })
			}
		}

		if (!filters.week_day || !filters.subject || !filters.time) {

			const paginated = await paginatedResults()

			res.json(paginated)
		}

		const timeInMinutes = convertHourToMinutes(filters.time as string)
		
		const classes = await ClassesRepository.classesFilter(filters.week_day, filters.subject, timeInMinutes)
			
		return res.json(classes)

	}

	async create(req: Req, res: Res) {
		const { subject, cost, schedule } = req.body
		const { id } = req.params

		try {
			
			const insertedClassesIds = await ClassesRepository.createClasses(subject, cost, id)

			const class_id = insertedClassesIds[0]

			const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
				return {
					class_id,
					week_day: scheduleItem.week_day,
					from: convertHourToMinutes(scheduleItem.from),
					to: convertHourToMinutes(scheduleItem.to)
				}
			})

			await ClassesRepository.createClassSchedule(classSchedule)

			return res.status(201).send('Class successfuly created')

		} catch(e) {

			return res.status(400).json({
				error: 'Unexpected error while creating new class'
			})
		}
	}
}
