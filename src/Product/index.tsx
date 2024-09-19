import styles from './styles.module.scss'

const Product = () => {
	return (
		<div className={styles.product} id='producto'>
			<div className={styles.background}>
				<h1>prod<br />ucto</h1>
			</div>
			<div className={styles.banner}>
				<div className={styles.pic}>
					<img src="/image1.jpg" alt="" />
				</div>
			</div>
		</div>
	)
}

export default Product