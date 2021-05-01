import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'


export function Header(){

  const router = useRouter()
  const currentUrl = router.pathname 
  console.log(currentUrl)

  return (
    <div className={styles.headerContainer}>
      <Image
      width = {327}
      height = {55}
      src={'/logo.png'}
      objectFit='contain'
      ></Image>

      <div className={styles.textHeader}>
        <a className={currentUrl == '/home' ? styles.filledHeader : ''}>Home</a>
        <a>Artificial Intelligence</a>
        <a>Web Scraping</a>
        <a>Get Start</a>
      </div>
    </div>
  )
}