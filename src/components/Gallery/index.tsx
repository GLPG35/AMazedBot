import { MouseEvent, useState } from 'react'
import styles from './styles.module.scss'
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi'
import { motion } from 'framer-motion'

type Props = {
	images: {
		url: string,
		description: string
	}[],
	index: number,
	unmount: () => void
}

const Gallery = ({ images, index, unmount }: Props) => {
	const [current, setCurrent] = useState(index)

	const arrowLeft = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		e.stopPropagation()

		if (current > 0) setCurrent(prev => prev - 1)
	}

	const arrowRight = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
		e.stopPropagation()

		if (current < images.length - 1) setCurrent(prev => prev + 1)
	}
	
	return (
		<div className={styles.gallery} onClick={unmount}>
			<div className={styles.currentPicture}>
				<motion.div className={styles.arrow} aria-disabled={current <= 0}
				onClick={arrowLeft}
				whileHover={current > 0 ? { scale: 1.1 } : {}} whileTap={current > 0 ? { scale: 0.9 }: {}}>
					<div className={styles.icon}>
						<PiCaretLeftBold />
					</div>
				</motion.div>
				<div className={styles.picture}>
					<div className={styles.pic} onClick={e => e.stopPropagation()}>
						<img src={images[current].url} alt={images[current].description} />
					</div>
					<div className={styles.description} onClick={e => e.stopPropagation()}>
						{images[current].description}
					</div>				
				</div>
				<motion.div className={styles.arrow} aria-disabled={current >= images.length - 1}
				onClick={arrowRight}
				whileHover={current < images.length - 1 ? { scale: 1.1 } : {}}
				whileTap={current < images.length - 1 ? { scale: 0.9 } : {}}>
					<div className={styles.icon}>
						<PiCaretRightBold />
					</div>
				</motion.div>
			</div>
			<div className={styles.list} onClick={e => e.stopPropagation()}>
				{images.map(({ url }, index) => {
					return (
						<motion.div className={styles.picture} key={url}
						animate={index == current ? { opacity: 1, scale: 1.1 } : { opacity: 0.5, scale: 0.8 }}
						onClick={() => setCurrent(index)}>
							<img src={url} alt="" />
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}

export default Gallery