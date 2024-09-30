import styles from './styles.module.scss'
import progress from '../../assets/progress.json'
import LogCard from '../../components/LogCard'

const sortProgress = progress.logs.sort((a, b) => {
	const parseDateA = new Date(Date.parse(a.date)).getTime()
	const parseDateB = new Date(Date.parse(b.date)).getTime()

	return parseDateB - parseDateA
})

const parsePercentage = progress.percentage < 0 ? 0 : progress.percentage > 100 ? 100 : progress.percentage

const ProgressPage = () => {
	return (
		<div className={styles.progressPage}>
			<div className={styles.title}>
				<h1>avan<br />ces</h1>
			</div>
			<div className={styles.progressList}>
				<div className={styles.progressBar}>
					<div className={styles.percentage} style={{ clipPath: `xywh(0 0 ${parsePercentage}% 100%)` }}>
						{parsePercentage}% completado
					</div>
					<div className={styles.percentage2}>{parsePercentage}% completado</div>
				</div>
				<div className={styles.list}>
					{sortProgress.map(({ id, date, title, summary }) => {
						const parseDate = new Intl.DateTimeFormat('es-UY', {
							day: 'numeric', month: 'long', year: 'numeric'
						}).format(new Date(Date.parse(date)))

						return <LogCard title={title} parseDate={parseDate} summary={summary} link={`/avances/${id}`} />
					})}
				</div>
			</div>
		</div>
	)
}

export default ProgressPage