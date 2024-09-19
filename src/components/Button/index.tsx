import styles from './styles.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { IconType } from 'react-icons'

type Props = {
	icon: IconType,
	text: string,
	action: () => void,
	invert?: boolean
}

const Button = ({ icon, text, action, invert }: Props) => {
	const [show, setShow] = useState(false)
	
	return (
		<motion.button layout onMouseEnter={() => setShow(true)}
		className={`${styles.button} ${invert ? styles.invert : ''}`}
		onMouseLeave={() => setShow(false)} whileTap={{ scale: 0.9 }}
		onClick={action}>
			<motion.div className={styles.btnIcon} layout='position'>
				{icon({})}
			</motion.div>
			<AnimatePresence mode='popLayout'>
				{show && <motion.span layout exit={{ opacity: 0 }}>{text}</motion.span>}
			</AnimatePresence>
		</motion.button>
	)
}

export default Button