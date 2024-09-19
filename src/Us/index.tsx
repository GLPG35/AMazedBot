import styles from './styles.module.scss'
import members from './members.json'

const Us = () => {
	return (
		<div className={styles.us} id='nosotros'>
			<div className={styles.background}>
				<h1>nosotros</h1>
			</div>
			<div className={styles.githubUsers}>
				{members.map(({ name, username, link, photoURL, role }) => {
					return (
						<div className={styles.user} key={username} onClick={() => window.open(link)}>
							<div className={styles.pic}>
								<img src={photoURL} alt="" />
							</div>
							<div className={styles.info}>
								<div className={styles.top}>
									<div className={styles.name}>
										{name}
									</div>
									<div className={styles.separator}>
										•
									</div>
									<div className={styles.role}>
										{role}
									</div>
								</div>
								<div className={styles.bottom}>
									<div className={styles.username}>
										github.com/{username}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Us