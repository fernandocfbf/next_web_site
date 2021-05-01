import Head from 'next/head'
import Image from 'next/image'

import styles from './login.module.scss'
import { LoginBox } from '../components/LoginBox'

export default function Login() {
	return (
		<div className={styles.homePage}>
			<div className={styles.containerLoginBox}>
				<LoginBox></LoginBox>
			</div>
		</div>
	)
}
