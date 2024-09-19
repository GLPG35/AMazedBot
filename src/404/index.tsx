import { PiHouseBold } from 'react-icons/pi'
import Button from '../components/Button'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { LayoutGroup, motion } from 'framer-motion'

const Page404 = () => {
	const navigate = useNavigate()
	
	return (
		<div className={styles.page404}>
			<div className={styles.info}>
				<LayoutGroup>
					<motion.p layout>La página que estabas buscando no existe</motion.p>
					<motion.p className={styles.small} layout>Comprueba la URL o vuelve al inicio</motion.p>
					<motion.div className={styles.action} layout>
						<Button icon={PiHouseBold} text='Volver al inicio' action={() => navigate('/')} />
					</motion.div>
				</LayoutGroup>
			</div>
			<h1>error 404</h1>
		</div>
	)
}

export default Page404