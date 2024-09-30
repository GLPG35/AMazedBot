import { PiHouseBold } from 'react-icons/pi'
import NotFound from '../components/NotFound'

const Page404 = () => {
	return (
		<NotFound text='La página que estabas buscando no existe'
		smallText='Comprueba la URL o vuelve al inicio' actionText='Volver al inicio'
		actionIcon={PiHouseBold} actionLink='/' />
	)
}

export default Page404