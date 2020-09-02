import React, { useState, FormEvent, useEffect, useContext } from 'react'

import { Context } from '../../context/AuthContext'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import api from '../../services/api'

import './styles.css'

function TeacherList() { 

	const [ teachers, setTeachers ] = useState([{
		avatar: '',
		bio: '',
		cost: 0,
		id: 0,
		account_id: 0,
		name: '',
		subject: '',
		whatsapp: '',
		schedules: []
		}
	])

	const { handleShowAllTeachers } = useContext(Context)
 
	const [xPos, setXPos] = useState(0)
	const [yPos, setYPos] = useState(0)

	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(3)
	const [totalClasses, setTotalClasses] = useState(0)

	const [ subject, setSubject ] = useState('') 
	const [ week_day, setWeekDay ] = useState('')
	const [ time, setTime ] = useState('')

	function handlePreviousButton() {
		
		if (page === 1) {
			return 
		}

		window.scrollTo(500, 500)
		setPage(page - 1)
	}

	function handleNextButton() {

		if (page === Math.ceil(totalClasses / limit)) {
			return
		}
		window.scrollTo(500, 500)
		setPage(page + 1)
	}

	async function searchTeachers() {
		const res = await api.get('classes', {
			params: {
				subject,
				week_day,
				time,
				page,
				limit
			}
		})

		return res
	}

	useEffect( () => {	

		//Scrolls to top results on classes list
		const rect:any = document.querySelector('main')
		const position = rect.getBoundingClientRect()
		const xPos = position.x
		const yPos = position.y
		setXPos(xPos)
		setXPos(yPos)

		if (subject === '' || week_day === '' || time === '' ) {

			const data = handleShowAllTeachers(page, limit)
			data.then( res => {
				setTeachers(res)
				console.log(res)
				setTotalClasses(res[0].total)
			})

		} else {

			searchTeachers().then( res => {
				//setTeachers(res.data.results)
			})
		}
	}, [page])

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers" onSubmit={ (e:FormEvent) => {
					e.preventDefault()
					searchTeachers().then( res => {
						setPage(1)
						setTeachers(res.data.results)
						setTotalClasses(res.data.total)
					})
				} }>
					<Select 
						name="subject" 
						label="Matéria"
						value= {subject}
						onChange = { e => { setSubject(e.target.value) }}
						options={[
							{ value: 'Artes', label: 'Artes' },
							{ value: 'Biologia', label: 'Biologia' },
							{ value: 'Ciências', label: 'Ciências' },
							{ value: 'Educação Física', label: 'Educação Física' },
							{ value: 'Física', label: 'Física' },
							{ value: 'Geografia', label: 'Geografia' },
							{ value: 'História', label: 'História' },
							{ value: 'Matemática', label: 'Matemática' },
							{ value: 'Português', label: 'Português' },
							{ value: 'Química', label: 'Química' }
						]} 
					/>
					<Select 
						name="week_day" 
						label="Dia da Semana"
						value= {week_day}
						onChange = { e => { setWeekDay(e.target.value) }}
						options={[
							{ value: '0', label: 'Domingo' },
							{ value: '1', label: 'Segunda-feira' },
							{ value: '2', label: 'Terça-feira' },
							{ value: '3', label: 'Quarta-feira' },
							{ value: '4', label: 'Quinta-feira' },
							{ value: '5', label: 'Sexta-feira' },
							{ value: '6', label: 'Sábado' },
						]} 
					/>
					<Input
						type="time" 
						name="time" 
						label="Hora"
						value= {time}
						onChange = { e => { setTime(e.target.value) }}
					/>

					<button type="submit">
						Buscar
					</button>
				</form>
			</PageHeader>

			<div className="pagination-container">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="pagination-left-button"
					onClick={handlePreviousButton}
				/>
				Página { page } de { Math.ceil(totalClasses / limit) }
				<FontAwesomeIcon
					icon={faChevronRight}
					className="pagination-right-button"
					onClick={handleNextButton}
				/>

			</div>

			<main>
				{teachers && teachers.map((teacher: Teacher, index: number) => {
					return <TeacherItem key={index} teacher={teacher} />
				})}
			</main>
			<div id="footer-pagination-buttons" className="pagination-container">
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="pagination-left-button"
					onClick={handlePreviousButton}
				/>
				Página { page } de { Math.ceil(totalClasses / limit) }
				<FontAwesomeIcon
					icon={faChevronRight}
					className="pagination-right-button"
					onClick={handleNextButton}
				/>

			</div>
		</div>
	)
}

export default TeacherList