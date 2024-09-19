import { PiCodeBold, PiMinusBold, PiRectangleBold, PiXBold } from 'react-icons/pi'
import styles from './styles.module.scss'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { LayoutGroup, motion } from 'framer-motion'
import snippet from './snippet.py?raw'

const Docs = () => {
	const navigate = useNavigate()
	
	return (
		<div className={styles.docs}>
			<div className={styles.title}>
				<h1>docume<br />ntación</h1>
			</div>
			<div className={styles.code}>
				<div className={styles.window}>
					<div className={styles.actions}>
						<div className={styles.windowTitle}>
							AMazedBot.py
						</div>
						<div className={styles.buttons}>
							<div className={styles.minimize}>
								<PiMinusBold />
							</div>
							<div className={styles.maximize}>
								<PiRectangleBold />
							</div>
							<div className={styles.close}>
								<PiXBold />
							</div>
						</div>
					</div>
					<div className={styles.snippet}>
						<pre>{snippet}</pre>
					</div>
				</div>
				<LayoutGroup>
					<motion.div className={styles.action} layout>
						<motion.span className={styles.label} layout>
							Ir a la referencia de la API
						</motion.span>
						<Button icon={PiCodeBold} text='Ver docs' action={() => navigate('/docs')} invert />
					</motion.div>
				</LayoutGroup>
			</div>
		</div>
	)
}

export default Docs