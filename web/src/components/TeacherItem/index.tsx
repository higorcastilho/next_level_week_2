import React from 'react'

import convertMinutesToHours from '../../utils/convertMinutesToHours'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import api from '../../services/api'

import './styles.css'

export interface Teacher {
	avatar: string
	bio: string
	cost: number
	id: number
	account_id: number
	name: string
	subject: string
	whatsapp: string
	schedules: any[]
}

interface TeacherItemProps {
	teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {


	function createNewConnection() {
		api.post('connections', {
			user_id: teacher.id
		})
	}

	function handleWeekDay(day: number) {
		switch (day) {
			case 6:
				return 'Domingo' 
				break;
			case 0:
				return 'Segunda' 
				break;
			case 1:
				return 'Terça' 
				break;
			case 2:
				return 'Quarta' 
				break;
			case 3:
				return 'Quinta' 
				break;
			case 4:
				return 'Sexta' 
				break;
			case 5:
				return 'Sábado' 
				break;
		}
	}

	const week_days:any[] = [

		{ week_day: 0, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 1, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 2, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 3, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 4, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 5, to: 0, from: 0, id: 0, class_id: 0 },
		{ week_day: 6, to: 0, from: 0, id: 0, class_id: 0 }
	]

	return (
		<article className="teacher-item">
			<header>
				<img src={teacher.avatar} alt="" />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>
			
			<p> {teacher.bio} </p>

			<div id="teacher-item-schedule-card">

				{ 
					week_days.map( (item, index) => {
						teacher.schedules.map( schedule => {

							if (item.week_day === schedule.week_day) {
								week_days[index] = schedule
							} else {
								week_days[index] = week_days[index]
							}
						})

						const [ fromHour, fromMinutes ] = convertMinutesToHours(week_days[index].from)
						const [ toHour, toMinutes ] = convertMinutesToHours(week_days[index].to)
						const day = handleWeekDay(week_days[index].week_day)
						if (!week_days[index].to && !week_days[index].from) {
							return <section style={{opacity: "0.45"}}>
									<p>Dia</p>
									<strong>{ day }</strong>
									<p> Horário</p>
									<strong> - </strong>
								</section>
						} else {
							return <section>
									<p>Dia</p>
									<strong>{ day }</strong>
									<p> Horário</p>
									<strong>{fromHour}:{fromMinutes} - {toHour}:{toMinutes}</strong>
								</section>
						}
					})
			 	}

			</div>

			<footer>
				<p>
					Preço/hora
					<strong>R$ {teacher.cost}</strong>
				</p>
				<a  
					target="_blank" 
					onClick={createNewConnection} 
					href={`https://wa.me/${teacher.whatsapp}`}
				>
					<img src={whatsappIcon} alt="Whatsapp"/>
					Entrar em contato
				</a>
			</footer>
		</article>
	)
}

export default TeacherItem