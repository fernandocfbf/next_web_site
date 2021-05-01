import styles from './styles.module.scss'
import {Header} from '../../components/Header'

export default function Home() {
	return (
    <div className={styles.homePage}>
      <Header></Header>
    </div>
    )
}