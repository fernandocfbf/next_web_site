import styles from './login.module.scss'
import { LoginBox } from '../components/LoginBox'
import Head from 'next/head'

export default function Login() {
	return (
		<div className={styles.loginPage}>
			<Head>
				<title>
					Login | Automation
        	</title>
			</Head>

			<div className={styles.containerLoginBox}>
				<LoginBox></LoginBox>
			</div>
		</div>
	)
}
