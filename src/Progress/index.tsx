import styles from './styles.module.scss'
import progress from './progress.json'
import Button from '../components/Button'
import { motion } from 'framer-motion'
import { PiEyeBold } from 'react-icons/pi'
import LogCard from '../components/LogCard'
import { useNavigate } from 'react-router-dom'

const sortProgress = progress.logs.sort((a, b) => {
	const parseDateA = new Date(Date.parse(a.date)).getTime()
	const parseDateB = new Date(Date.parse(b.date)).getTime()

	return parseDateB - parseDateA
}).filter((_x, i) => i < 4)

const parsePercentage = progress.percentage < 0 ? 0 : progress.percentage > 100 ? 100 : progress.percentage

const Progress = () => {
	const navigate = useNavigate()
	
	return (
		<div className={styles.progress} id='avances'>
			<div className={styles.title}>
				<h1>avan<br />ces</h1>
			</div>
			<div className={styles.recent}>
				<div className={styles.listTitle}>
					<h2>Más recientes</h2>
					<motion.div className={styles.action}>
						<Button icon={PiEyeBold} text='Ver todos' action={() => navigate('/avances')} />
					</motion.div>
				</div>
				<div className={styles.list}>
					{sortProgress.map(({ date, title, summary }) => {
						const parseDate = new Intl.DateTimeFormat('es-UY', {
							day: 'numeric', month: 'long', year: 'numeric'
						}).format(new Date(Date.parse(date)))

						return <LogCard title={title} parseDate={parseDate} summary={summary} />
					})}
				</div>
				<div className={styles.progressBar}>
					<div className={styles.percentage} style={{ clipPath: `xywh(0 0 ${parsePercentage}% 100%)` }}>
						{parsePercentage}% completado
					</div>
					<div className={styles.percentage2}>{parsePercentage}% completado</div>
				</div>
			</div>
		</div>
	)
}

export default Progress