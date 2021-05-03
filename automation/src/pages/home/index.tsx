import styles from './styles.module.scss'
import { Header } from '../../components/Header'
import Image from 'next/image'
import {
	AiOutlineLinkedin,
	AiOutlineInstagram,
	AiOutlineWhatsApp,
	AiOutlineGithub
} from 'react-icons/ai'

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

				<div className={styles.icons}>

					<a href='https://www.linkedin.com/in/fernando-fincatti-93baab189/' style={{ textDecoration: "none" }}>
						<AiOutlineLinkedin href='' style={{ fontSize: "2rem" }}></AiOutlineLinkedin>
					</a>

					<a href='https://www.instagram.com/dfernandob/' style={{ textDecoration: "none" }}>
						<AiOutlineInstagram style={{ fontSize: "2rem" }}></AiOutlineInstagram>
					</a>
					<a href='https://wa.me/5511960361402' style={{ textDecoration: "none" }}>
						<AiOutlineWhatsApp style={{ fontSize: "2rem" }}></AiOutlineWhatsApp>
					</a>

				</div>
				<div className={styles.github}>
					<AiOutlineGithub ></AiOutlineGithub>
				</div>

			</div>
		</div>
	)
}