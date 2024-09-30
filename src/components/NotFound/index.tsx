import Button from '../../components/Button'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { LayoutGroup, motion } from 'framer-motion'
import { IconType } from 'react-icons'

type Props = {
	text: string,
	smallText: string,
	actionText: string,
	actionLink: string,
	actionIcon: IconType
}

const NotFound = ({ text, smallText, actionText, actionLink, actionIcon }: Props) => {
	const navigate = useNavigate()
	
	return (
		<div className={styles.notFound}>
			<div className={styles.info}>
				<LayoutGroup>
					<motion.p layout>{text}</motion.p>
					<motion.p className={styles.small} layout>{smallText}</motion.p>
					<motion.div className={styles.action} layout>
						<Button icon={actionIcon} text={actionText} action={() => navigate(actionLink)} />
					</motion.div>
				</LayoutGroup>
			</div>
			<h1>error 404</h1>
		</div>
	)
}

export default NotFound