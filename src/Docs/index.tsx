import { PiFilePdf, PiMinusBold, PiRectangleBold, PiXBold } from 'react-icons/pi'
import styles from './styles.module.scss'
import Button from '../components/Button'
import { LayoutGroup, motion } from 'framer-motion'
import snippet from './snippet.py?raw'

const Docs = () => {
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
							Documentación técnica en PDF
						</motion.span>
						<Button icon={PiFilePdf} text='Ver PDF' action={() => window.open('/doc_tec_amazedbot.pdf', '__blank')} invert />
					</motion.div>
				</LayoutGroup>
			</div>
		</div>
	)
}

export default Docs