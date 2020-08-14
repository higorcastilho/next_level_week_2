import React from 'react'

import CommonCase from '../../components/CommonCase'

import './styles.css'
import successCheck from '../../assets/images/icons/success-check-icon.svg'

function DoneRegister() {
	return (
		<div id="page-done-register">
				<CommonCase 
					mainImg={successCheck} 
					title="Cadastro concluído" 
					subtitle="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência."
					button="Fazer login"
					route="/login"
				/>
		</div>
	)
}

export default DoneRegister