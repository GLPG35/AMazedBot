import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import progress from '../../../assets/progress.json'
import { useEffect, useState } from 'react'
import NotFound from '../../../components/NotFound'
import { PiArrowLeftBold, PiCaretLeftBold, PiCaretRightBold, PiChatsCircleBold, PiFootprintsBold, PiImagesBold, PiMagnifyingGlassBold, PiNotepadBold, PiSquaresFourBold, PiTextAlignCenterBold, PiWarningBold } from 'react-icons/pi'
import Gallery from '../../../components/Gallery'

const Log = () => {
	const { id } = useParams()
	const parseId = id as string
	const navigate = useNavigate()
	const [openGallery, setOpenGallery] = useState<number | null>(null)

	useEffect(() => {
		if (!id) navigate('/')
	}, [id])
	
	const log = progress.logs.find(x => x.id == +parseId)
	const prevLog = +parseId <= 1 ? null : progress.logs.find(x => x.id == +parseId - 1)
	const nextLog = +parseId >= progress.logs.length ? null : progress.logs.find(x => x.id == +parseId + 1)
	
	return (
		<>
			{log ?
				<div className={styles.log}>
					{log.attachments && openGallery !== null && <Gallery images={log.attachments} index={openGallery} unmount={() => setOpenGallery(null)} />}
					<div className={styles.title}>
						<div className={styles.back} onClick={() => navigate('/avances')}>
							<div className={styles.icon}>
								<PiArrowLeftBold />
							</div>
							<span>Volver</span>
						</div>
						{log.title}
						<div className={styles.date}>
							{Intl.DateTimeFormat('es-UY', { dateStyle: 'long' }).format(new Date(log.date))}
						</div>
					</div>
					<div className={styles.sections}>
						<fieldset className={styles.section}>
							<legend>Resumen <div className={styles.icon}><PiTextAlignCenterBold /></div></legend>
							{log.summary}
						</fieldset>
						<fieldset className={styles.section}>
							<legend>Tareas completadas <div className={styles.icon}><PiNotepadBold /></div></legend>
							{log.tasks.map(({ title, advancements, code, tests }) => {
								return (
									<div className={styles.subSection} key={title}>
										<h3>{title}</h3>
										{advancements &&
											<ul>
												{advancements && advancements.map(adv => {
													if (typeof adv == 'object') {
														return <>
															<li>{adv[0]}</li>
															<ul>
																{adv.map((subAdv, index) => index == 0 ? '' : <li key={subAdv}>{subAdv}</li>)}
															</ul>
														</>
													}

													return <li key={adv}>{adv}</li>
												})}
											</ul>
										}
										{code &&
											<div className={styles.subSubSection}>
												<h4>Código</h4>
												{code.advancements.length > 1 ?
													<ul>
														{code.advancements.map(adv => <li key={adv}>{adv}</li>)}
													</ul>
												:
													code.advancements[0]
												}
											</div>
										}
										{tests &&
											<div className={styles.subSubSection}>
												<h4>Pruebas y ajustes</h4>
												{tests.advancements.length > 1 ?
													<ul>
														{tests.advancements.map(adv => <li key={adv}>{adv}</li>)}
													</ul>
												:
													tests.advancements[0]
												}
											</div>
										}
									</div>
								)
							})}
						</fieldset>
						<fieldset className={styles.section}>
							<legend>Problemas encontrados <div className={styles.icon}><PiWarningBold /></div></legend>
							{log.issues.map(({ title, description }) => {
								return (
									<div className={styles.subSection} key={title}>
										<h3>{title}</h3>
										{typeof description == 'object' ?
											<ul>
												{description.map(issue => <li key={issue}>{issue}</li>)}
											</ul>
										: description
										}
									</div>
								)
							})}
						</fieldset>
						<fieldset className={styles.section}>
							<legend>Próximos pasos <div className={styles.icon}><PiFootprintsBold /></div></legend>
							{log.nextSteps.map(({ title, calendar, advancements }) => {
								return (
									<div className={styles.subSection} key={title}>
										<h3>{title}</h3>
										{advancements &&
											<ul>
												{advancements.map(adv => <li key={adv}>{adv}</li>)}
											</ul>
										}
										{calendar &&
											<ul>
												{calendar.map(({ title, date }) => {
													const parseDate = Intl.DateTimeFormat('es-UY', { dateStyle: 'long' }).format(new Date(date))
													
													return (
														<li key={title}>
															{title}: {parseDate}
														</li>
													)
												})}
											</ul>
										}
									</div>
								)
							})}
						</fieldset>
						<fieldset className={styles.section}>
							<legend>Recursos <div className={styles.icon}><PiMagnifyingGlassBold /></div></legend>
							{log.resources.map(({ title, advancements }) => {
								return (
									<div className={styles.subSection} key={title}>
										<h3>{title}</h3>
										<ul>
											{advancements.map(adv => {
												const isLink = adv.includes('https://')
												
												return (
													<li key={adv}>{isLink ? <a href={adv} target='_blank'>{adv}</a> : adv}</li>
												)
											})}
										</ul>
									</div>
								)
							})}
						</fieldset>
						<fieldset className={styles.section}>
							<legend>Comentarios <div className={styles.icon}><PiChatsCircleBold /></div></legend>
							{log.comments.map(({ title, advancements }) => {
								return (
									<div className={styles.subSection} key={title}>
										<h3>{title}</h3>
										<ul>
											{advancements.map(adv => <li key={adv}>{adv}</li>)}
										</ul>
									</div>
								)
							})}
						</fieldset>
						{log.attachments &&
							<fieldset className={styles.section}>
								<legend>Adjuntos <div className={styles.icon}><PiImagesBold /></div></legend>
								<div className={styles.photoGrid}>
									{log.attachments.map(({ description, url }, index) => {
										return (
											<div className={styles.picture} onClick={() => setOpenGallery(index)}>
												<img src={url} alt={description} key={url} />
											</div>
										)
									})}
									</div>
							</fieldset>
						}
						<div className={styles.navigation}>
							{prevLog &&
								<div className={styles.prev} onClick={() => navigate(`/avances/${prevLog.id}`)}>
									<div className={styles.icon}>
										<PiCaretLeftBold />
									</div>
									<div className={styles.info}>
										<div className={styles.top}>
											Anterior
										</div>
										<div className={styles.bot}>
											{prevLog.title}
										</div>
									</div>
								</div>
							}
							{nextLog &&
								<div className={styles.next} onClick={() => navigate(`/avances/${nextLog.id}`)}>
									<div className={styles.icon}>
										<PiCaretRightBold />
									</div>
									<div className={styles.info}>
										<div className={styles.top}>
											Siguiente
										</div>
										<div className={styles.bot}>
											{nextLog.title}
										</div>
									</div>
								</div>
							}
						</div>
					</div>
				</div>
			:
				<NotFound text='Avance no encontrado'
				smallText='Verifica la URL o vuelve a buscar en la lista de avances'
				actionIcon={PiSquaresFourBold} actionText='Lista de avances' actionLink='/avances' />
			}
		</>
	)
}

export default Log