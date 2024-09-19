import Button from '../Button'
import Icon from '../Icon'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { PiGithubLogoBold } from 'react-icons/pi'
import { Link, useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

const Header = () => {
	const navigate = useNavigate()
	
	return (
		<div className={styles.header}>
			<div className={styles.wrapper}>
				<div className={styles.icon} onClick={() => navigate('/')}>
					<Icon color='var(--secondary-color)' />
				</div>
				<nav>
					<Link to='/'>inicio</Link>
					<HashLink to="/#producto">producto</HashLink>
					<Link to="/avances">avances</Link>
					<Link to="/docs">docs</Link>
					<HashLink to="/#nosotros">nosotros</HashLink>
				</nav>
				<motion.div className={styles.action} layout>
					<Button icon={PiGithubLogoBold} text='Código fuente'
					action={() => window.open('https://github.com/GLPG35/AMazedBot')} />
				</motion.div>
			</div>
		</div>
	)
}

export default Header