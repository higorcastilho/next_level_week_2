import api from '../services/api'

interface TeacherResponse {
	name: string
	avatar: string
	bio: string
	cost: number
	subject: string
	whatsapp: string
	classIdPrimary: number
	schedules: any[]
	total: number
}

interface ScheduleItem {
	class_id: number
	week_day: number
	from: string
	to: string
}

const showSchedules = ():Promise<ScheduleItem[]> => {
	return new Promise( (resolve) => {
		api.get('classes-schedules').then( (res) => {
			resolve(res.data)
		})
	})
}

const showTeachers = (page: number, limit: number):Promise<TeacherResponse[]> => {

	return new Promise( (resolve) => {

			api.get('classes', {
				params: {
					page, 
					limit
				}
			}).then( (res) => {
				
				const teachersResponse = res.data.results.map( (teacherResponse: TeacherResponse) => {

					const schedules:any[] = []

					return {
						name: teacherResponse.name,
						avatar: teacherResponse.avatar,
						bio: teacherResponse.bio,
						cost: teacherResponse.cost,
						subject: teacherResponse.subject,
						whatsapp: teacherResponse.whatsapp,
						classIdPrimary: teacherResponse.classIdPrimary,
						schedules: schedules,
						total: res.data.total
					}
				})

				resolve(teachersResponse)
			})
	} )
}

export default async function showAllTeachers(page: number, limit: number):Promise<any[]> {
	
	const schedules = await showSchedules()
	
	const teachers = await showTeachers(page, limit)


	return new Promise( resolve => {
		
		teachers.map( (teacher: TeacherResponse) => {
			schedules.map( (scheduleItem: ScheduleItem) => {
				if (scheduleItem.class_id === teacher.classIdPrimary) {
					teacher.schedules.push(scheduleItem)
				}
			} )
		})

		resolve(teachers)
	})
} 

