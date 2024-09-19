import { useState } from 'react'
import Logo from '../components/Logo'
import Triangle from '../components/Triangle'
import styles from './styles.module.scss'
import Product from '../Product'
import Progress from '../Progress'
import Us from '../Us'
import Docs from '../Docs'

const Home = () => {
	const [arrowHover, setArrowHover] = useState(false)

	const sections = [
		<Product key='product' />,
		<Progress key='progress' />,
		<Docs key='docs' />,
		<Us key='us' />
	]
	
	return (
		<>
			<div className={styles.home}>
				<div className={styles.logo}>
					<Logo color='var(--secondary-color)' />
				</div>
				<div className={styles.arrow} onClick={() => location.href = '#producto'}>
					<Triangle color='var(--secondary-color)' fill={arrowHover ? 'var(--secondary-color)' : 'transparent'}
					onMouseEnter={ () => setArrowHover(true) } onMouseLeave={ () => setArrowHover(false) } />
				</div>
			</div>
			{sections.map(section => section)}
		</>
	)
}

export default Home