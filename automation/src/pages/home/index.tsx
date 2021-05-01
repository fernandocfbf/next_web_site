import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import Image from 'next/image'

export default function Home() {
	return (
		<div className={styles.homePage}>
			<Header></Header>

			<div className={styles.introduction}>
				<h1>
					Improving your experience as researcher
      			</h1>

				<p>
					Here we do the hard work for you using 
					the best tools on the market.
     			</p>
				<p>
					Automate process and speed up your 
					data collection right now with automation.
				</p>

				<button>
					Get Start
      			</button>
			</div>
		</div>
	)
}