import Image from 'next/image'
import { Router, useRouter } from 'next/router'
import styles from './styles.module.scss'




export function Header() {

  const router = useRouter()
  const currentUrl = router.pathname

  function logOut() {
    router.push('/')
  }

  function redirect(pathName) {
    router.push(pathName)
  }

  return (
    <div className={styles.headerContainer}>
      <Image
        width={327}
        height={55}
        src={'/logo.png'}
        objectFit='contain'
      ></Image>

      <div className={styles.textHeader}>
        <button
          className={currentUrl == '/home' ? styles.filledHeader : styles.headerButton}
          onClick={() => redirect('/home')}>
          Home
        </button>
        <button 
        className={currentUrl == '/artificialIntelligence' ? styles.filledHeader : styles.headerButton}
        onClick={() => redirect('/artificialIntelligence')}>
          Artificial Intelligence
        </button>
        <button
          className={currentUrl == '/webScraping' ? styles.filledHeader : styles.headerButton}>
          Web Scraping
          </button>
        <button
          className={currentUrl == '/getStart' ? styles.filledHeader : styles.headerButton}>
          Get Start
           </button>
        <button className={styles.logOut} onClick={() => logOut()}>Log Out</button>
      </div>
    </div>
  )
}