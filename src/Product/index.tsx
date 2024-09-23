import styles from './styles.module.scss'
import materials from './materials.json'

const Product = () => {
	return (
		<div className={styles.product} id='producto'>
			<div className={styles.background}>
				<h1>prod<br />ucto</h1>
			</div>
			{/* <div className={styles.banner}>
				<div className={styles.pic}>
					<img src="/image1.jpg" alt="" />
				</div>
			</div> */}
			<div className={styles.productInfo}>
				<div className={styles.description}>
					<h2>Objetivo</h2>
					<p>Proyecto centrado en la creación de un carro robot de 2 ruedas que pueda salir de un laberinto. Realizado con <a href="https://microbit.org" target='__blank'>micro:bit</a>.</p>
				</div>
				<div className={styles.materials}>
					<h2>Materiales</h2>
					<div className={styles.list}>
						{materials.map(({ name, qtty, img }) => {
							return (
								<div className={styles.material} key={name}>
									<div className={styles.pic}>
										<img src={img} alt="" />
									</div>
									<div className={styles.info}>
										<div className={styles.name}>
											{name}
										</div>
										<div className={styles.qtty}>
											x{qtty}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className={styles.ps}>
					*Estos materiales pueden fluctuar a medida que avanza el proyecto, en cualquier caso, se agregarán o quitarán materiales de ser necesario.
				</div>
			</div>
		</div>
	)
}

export default Product