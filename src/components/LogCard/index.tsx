import { useState } from 'react'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { PiArrowRightBold } from 'react-icons/pi'

type Props = {
	title: string,
	parseDate: string,
	summary: string
}

const LogCard = ({ title, parseDate, summary }: Props) => {
	const [hover, setHover] = useState(false)

	return (
		<motion.div className={styles.logCard} key={title} onMouseEnter={() => setHover(true)}
		onMouseLeave={() => setHover(false)} whileTap={{ scale: 0.9 }}>
			<motion.div className={styles.arrow} initial={{ x: 100 }}
			animate={hover ? { x: 0 } : { x: 100 }}>
				<PiArrowRightBold />
			</motion.div>
			<div className={styles.info}>
				<div className={styles.logTitle}>
					{title}
				</div>
				<div className={styles.date}>
					{parseDate}
				</div>
			</div>
			<div className={styles.summary}>
				{summary.length > 95 ? `${summary.substring(0, 95)}...` : summary}
			</div>
		</motion.div>
	)
}

export default LogCard